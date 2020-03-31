/**
 * @author Walson Vital dos Santos
 */

const servicesSIGEP = require('./Services')

/**
 * @class
 */
class Init {
    constructor(){
        //important
        this.usuario = null
        this.senha = null
        this.codAdministrativo = null
        this.idContrato = null
        this.idCartaoPostagem = null
        this.identificador = null //CNPJ
        this.cepOrigem = null
        this.clienteData = {}
    }

    //init
    init({ usuario, senha, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem = null }){

        this.usuario = usuario
        this.senha = senha
        this.codAdministrativo = codAdministrativo
        this.idContrato = idContrato
        this.idCartaoPostagem = idCartaoPostagem
        this.identificador = identificador
        this.cepOrigem = cepOrigem

        return new servicesSIGEP( this )
    }

    /**
     * Get user Data.
     */
    getUser(){
        return {
            usuario: this.usuario,
            senha: this.senha,
            codAdministrativo: this.codAdministrativo,
            idContrato: this.idContrato,
            idCartaoPostagem: this.idCartaoPostagem,
            identificador: this.identificador,
            cepOrigem: this.cepOrigem,
            clienteData: this.clienteData
        }
    }

    getContrato( idContrato = null ){
        return this.clienteData.contratos.find(( val ) => {
            if(idContrato){
                return val.contratoPK.numero === idContrato
            }

            return val.contratoPK.numero === this.idContrato
        })
    }

    getServicos( idCartaoPostagem ){
        let cartao = null
        if( idCartaoPostagem ){
            cartao = this.getContrato().cartoesPostagem.find(( val ) => {
                return val.numero === idCartaoPostagem
            })
        }else{
            cartao = this.getContrato().cartoesPostagem.find(( val ) => {
                return val.numero === this.idCartaoPostagem
            })

        }

        if(cartao){
            return cartao.servicos
        }else{
            throw Error("Não foi encontrado cartão de postagem")
        }
    }

    _setClienteData( data ){
        this.clienteData = {
            ...this.clienteData,
            ...data
        }
    }

}

module.exports = new Init()
