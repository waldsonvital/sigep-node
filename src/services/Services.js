/**
 * @author: waldson Vital
 */
const BuscaCliente = require('../class/BuscaCliente')

/**
 * @class: Services
 * @classdesc: Serviços disponivel dos SIGEP
 */
class Services {
    constructor(user){
        this.user = user

        //init nos dados do client
        this.buscaCliente()
    }

    verificaDisponibilidadeServico = () => {

    }

    consultaCep = () => {

    }

    solicitaEtiquetas = () => {

    }

    geraDigitoVerificadorEtiquetas = () => {

    }

    fechaPlpVariosServicos = () => {

    }

    calcPrecoPrazo = () => {

    }

    buscaCliente = async () => {
        let userData = this.user.getUser()
        let result = await BuscaCliente( userData )

        if( Object.keys( userData.clienteData ).length === 0 ){
            this.user.setClienteData( result )
        }

        return result
    }

    rastrearObjeto = () => {

    }

    verificarStatusCartaoPostagem = () => {

    }

    bloquearObjeto = () => {

    }

    cancelarObjeto = () => {

    }
}

module.exports = Services
