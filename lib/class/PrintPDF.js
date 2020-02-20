const jsdom = require("jsdom")
const { JSDOM } = jsdom
const Helper = require('./helpers')
const ServicosPostagem = require('../models/ServicoPostagemModel')
const ejs = require('ejs')
const path = require('path')
const pathLocal = path.dirname(__dirname)
const { promisify } = require('util')
const fs = require('fs')
const puppeteer = require('puppeteer')
//const tagMod = require('../assets/html/tag84x101.html')

/**
 * @class
 */
class PrintPDF {
    /**
     * Adiciona os valores e monta o templete para gerar o PDF
     * - voucher
     * - lista de postagem
     */
    constructor(idPLP, PLP, path, filename){
        this.idPLP =idPLP
        this.PLP = PLP
        this.path = path
        this.filename = filename

        this.helpers = new Helper()
        this.servicosPostagem = new ServicosPostagem()

    }

    getServico = ( code ) => {
        let service = this.servicosPostagem.getService( code )
        return service.name? service.name : ''
    }

    /**
     * Atualiza ou altera os valores da classe
     */
    update = (idPLP = null, PLP = null, path = null, filename = null) => {
        this.idPLP = idPLP? idPLP : this.idPLP
        this.PLP = PLP? PLP : this.PLP
        this.path = path? path : this.path
        this.filename = filename? filename : this.filename

        return this
    }

    _buildHTMLTags = async () => {
        let correioslog = this.PLP.correioslog
        let helpers = {
            getServico: this.getServico,
            format: this.helpers.format,
        }

        //carregamento de imagens por base64
        let logo_correios = fs.readFileSync( pathLocal + `/assets/img/correios-logo.png` )
        logo_correios = Buffer.from( logo_correios ).toString('base64')

        correioslog.objeto_postal = correioslog.objeto_postal.map(async ( val ) => {
            val.base64 = {}

            //datamatrix possui uma lógica complicada, olhe no manual dos correios
            val.base64.datamatrix = await this.helpers.generateDatamatrix( val, correioslog.remetente, correioslog.plp )
            val.base64.cepBarcode = await this.helpers.generateBarcode128( val.nacional.cep_destinatario, 18, 40 )
            val.base64.code = await this.helpers.generateBarcode128( val.numero_etiqueta, 18, 80 )

            val.base64.logo_correios = logo_correios

            val.base64.tipoEncomenda = this.helpers.getLogoTipoEncomenda( val.codigo_servico_postagem )

            return val
        })

        correioslog.objeto_postal = await Promise.all( correioslog.objeto_postal )

        let renderFile = promisify(ejs.renderFile)
        let html = await renderFile(pathLocal + '/assets/html/tag84x101.ejs', {
            correioslog,
            ...helpers
        }, {
            async: true,
            client: true
        })

        return html
    }

    _buildHTMLVoucher = async ( dateClosed ) => {
        let correioslog = this.PLP.correioslog
        let data = {
            contrato:  correioslog.remetente.numero_contrato,
            client: correioslog.remetente.nome_remetente,
            phone: correioslog.remetente.telefone_remetente,
            email: correioslog.remetente.email_remetente,
            date: dateClosed
        }

        let packageList = []
        correioslog.objeto_postal.map(( val ) => {
            let index = packageList.findIndex(( el ) => {
                return el.code === val.codigo_servico_postagem
            })

            if(index < 0){
                let serv = this.servicosPostagem.getService( val.codigo_servico_postagem )

                packageList.push({
                    code: val.codigo_servico_postagem,
                    name: serv.name,
                    type: serv.type,
                    id: serv.id,
                    qtd: 1
                })
            }else{
                packageList[index].qtd += 1
            }
        })

        data.barcode = await this.helpers.generateBarcode128( this.idPLP, 18, 75 )
        data.packageList = packageList
        data.idPLP = this.idPLP

        let buffLogo = fs.readFileSync( pathLocal + '/assets/img/logo-correios.png' )
        data.logo = Buffer.from( buffLogo ).toString( 'base64' )

        let renderFile = promisify(ejs.renderFile)
        let html = await renderFile(pathLocal + '/assets/html/voucher.ejs', {
            ...data
        }, {
            async: true,
            client: true
        })

        return html

    }

    tagsHTML = async () => {
        return await this._buildHTMLTags()
    }

    tagsToPDF = async ( pathOut ) => {
        const browser = await puppeteer.launch()
        const html = await this._buildHTMLTags()

        let page = await browser.newPage()

        //carrrega o html na pagina - porem o css não é carregado ee preciso adicionar depois
        await page.goto(`data:text/html,${ html }`, {
            waitUntil: 'networkidle0'
        })

        //adiciona css
        await page.addStyleTag({
            path: pathLocal + '/assets/css/tag84x101.css'
        })

        await page.pdf({
            path: pathOut,
            printBackground: true,
            preferCSSPageSize: true,
            width: '101.6mm',
            height: '84.7mm'
        })

        await page.close()
    }

    voucherToPDF = async ( pathOut, dateClosed = null ) => {
        const browser = await puppeteer.launch()
        const html = await this._buildHTMLVoucher( dateClosed  )

        let page = await browser.newPage()

        //carrrega o html na pagina - porem o css não é carregado ee preciso adicionar depois
        await page.goto(`data:text/html,${ html }`, {
            waitUntil: 'networkidle0'
        })

        //adiciona css
        await page.addStyleTag({
            path: pathLocal + '/assets/css/voucher.css'
        })

        await page.pdf({
            path: pathOut,
            printBackground: true,
            preferCSSPageSize: true,
            format: 'A4'
        })

        await page.close()

    }

}

module.exports = PrintPDF
