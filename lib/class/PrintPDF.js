const jsdom = require("jsdom")
const { JSDOM } = jsdom
const Helper = require('./helpers')
const ServicosPostagem = require('../models/ServicoPostagemModel')
const ejs = require('ejs')
const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const pathLocal = path.dirname(__dirname)
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
        let helpers = {
            getServico: this.getServico,
            format: this.helpers.format
        }
        console.log(this.PLP.correioslog.objeto_postal[0].servico_adicional)
        let renderFile = promisify(ejs.renderFile)
        let html = await renderFile(pathLocal + '/assets/html/tag84x101.ejs', {
            correioslog: this.PLP.correioslog,
            ...helpers
        }, {
            async: true,
            client: true
        })

        console.log( html )
    }

    tagsHTML = () => {

    }

    tagsToPDF = async () => {
        await this._buildHTMLTags(  )
    }

    voucherToPDF = () => {

    }

}

module.exports = PrintPDF
