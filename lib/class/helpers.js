const bwipjs = require('bwip-js')
const ServicoModel = require('../models/ServicoPostagemModel')
const fs = require('fs')
const path = require('path')
const pathLocal = path.dirname(__dirname)

class Helper {
    constructor(){
        //bind
        this.clearCEP = this.clearCEP.bind( this )
        this.format = this.format.bind( this )
        this._completeZeroNumber = this._completeZeroNumber.bind( this )
        this._digitoVerificadorCEP = this._digitoVerificadorCEP.bind( this )
        this._getServicosAdicionais = this._getServicosAdicionais.bind( this )
        this._phoneLenght = this._phoneLenght.bind( this )
        this.generateBarcode128 = this.generateBarcode128.bind( this )
        this.generateDatamatrix = this.generateDatamatrix.bind( this )
        this.getLogoTipoEncomenda = this.getLogoTipoEncomenda.bind( this )
    }

    clearCEP(data){
        let regNDig = /\D/g
        let regCep = /^\d{5}(-\d{3})?$/

        if(typeof data === 'object'){
            Object.keys(data).map(( key ) => {
                if(typeof data[key] === 'string'){
                    if(regCep.test( data[key] )){
                        data[key] = data[key].replace(regNDig, '')
                    }
                }
            })

        }else{
            data = data.replace(regNDig, '')
        }

        return data
    }

    format( code, format ){
        if( format === 'rastreio' ){
            let codeArr = code.replace(/^(\D{2})(\d{3})(\d{3})(\d{3})(\D{2}).*/gm, '$1 $2 $3 $4 $5')

            return codeArr
        }else if( format === 'cep' ){
            let cepArr = code.replace(/(\d{5})(\d{3})/gm, '$1-$2')

            return cepArr
        }
    }

    _completeZeroNumber( numero ){
        //não permite string não numerica no complemento
        if(RegExp(/\D/).test(numero)){
            return '000000'
        }else{
            numero = numero.split('')
            let count = numero.length

            for(let i = 0; i < 6 - count; i++){
                numero.unshift('0')
            }

            return numero.join('')
        }
    }

    // pega o digito verificador do cep Ex: CEP: 71010050 7+1+0+1+0+0+5+0 = 14 Subtrai-se 14 e 20
    _digitoVerificadorCEP( cep ){
        let multiplos10 = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        let valor = 0
        let digito = -1
        cep = cep.split('')

        cep.map(( numero ) => {
            valor = valor + parseInt( numero)
        })

        multiplos10.map(( mult ) => {
            if(digito === -1 && mult > valor){
                digito = mult - valor
            }
        })

        return digito
    }

    _getServicosAdicionais( servicos ){
        if( servicos.length > 1 ){
            let code = '25'

            servicos.map(( val) => {
                if( val !== '025'){
                    let sv = val.substr(1, 2)
                    code = code + sv
                }
            })

            if(code.length < 12){
                while(code.length < 12){
                    code = code + '0'
                }

                return code
            }else if( code.length === 12 ){
                return code
            }else{
                return code.substr(0, 12)
            }
        }else{
            return '250000000000'
        }
    }

    _phoneLenght( phone ){
        while( phone.length === 12 ){
            phone = "0" + phone
        }

        return phone
    }

    async generateDatamatrix( postagem, remetente, plp ){
        let numero_remetente = this._completeZeroNumber( remetente.numero_remetente )
        let string = postagem.nacional.cep_destinatario


        string = string + this._completeZeroNumber( postagem.destinatario.numero_end_destinatario )
        string = string + remetente.cep_remetente
        string = string + numero_remetente
        string = string + this._digitoVerificadorCEP( postagem.nacional.cep_destinatario )
        string = string + '51'
        string = string + postagem.numero_etiqueta
        string = string + this._getServicosAdicionais( postagem.servico_adicional.codigo_servico_adicional )
        string = string + plp.cartao_postagem
        string = string + postagem.codigo_servico_postagem
        string = string + '01'
        string = string + numero_remetente
        string = string + this._completeZeroNumber( postagem.servico_adicional.valor_declarado ).substr(1, 5)
        string = string + this._phoneLenght( postagem.destinatario.telefone_destinatario )
        string = string + '-00.000000'
        string = string + '-00.000000'
        string = string + '|'

        // datamatrix
        let qrcode = await bwipjs.toBuffer({
            bcid: 'datamatrix',
            text: string,
            rows: 48,
            columns: 48
        })

        return Buffer.from( qrcode ).toString('base64')
    }

    async generateBarcode128( code, height = 18, width = null ){
        let opt = {
            bcid: `code128`,
            text: code,
            scale: 4,
            height: height,
            includetext: false
        }

        if(width){
            opt.width = width
        }

        let barcode = await bwipjs.toBuffer(opt)

        return Buffer.from( barcode ).toString('base64')
    }

    /**
     * retona o logo do tipo da encomenda
     */
    getLogoTipoEncomenda( code ){
        let serv = new ServicoModel()
        let buff = null
        let servico = serv.getService( code )

        if( servico === undefined || servico.type === 'outros' ){
            buff = fs.readFileSync( pathLocal + '/assets/img/outros.png')
        }else if( servico.type === 'premium' ){
            buff = fs.readFileSync( pathLocal + '/assets/img/sedex-premium.png')
        }else if( servico.type === 'sedex' ){
            buff = fs.readFileSync( pathLocal + '/assets/img/sedex.png')
        }else if( servico.type === 'pac' ){
            buff = fs.readFileSync( pathLocal + '/assets/img/pac.png')
        }

        return Buffer.from( buff ).toString('base64')
    }
}

module.exports = Helper
