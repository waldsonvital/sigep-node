/**
 * @author Walson Vital dos Santos
 */

const servicesSIGEP = require('./Services')

/**
 * @class
 */
class Init {
    //important
    usuario = null
    senha = null
    codAdministrativo = null
    idContrato = null
    idCartaoPostagem = null
    identificador = null //CNPJ
    cepOrigem = null
    clienteData = {}

    //init
    init = ({ usuario, senha, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem = null }) => {
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
    getUser = () => {
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

    setClienteData = ( data ) => {
        this.clienteData = {
            ...this.clienteData,
            ...data
        }
    }

}

module.exports = new Init()
