/**
 * @author: waldson Vital
 */
const helpers = require('../class/helpers')
const BuscaClienteService = require('../class/BuscaCliente')
const ConsultaCEPService = require('../class/ConsultaCep')
const VerificaDispService = require('../class/VerificaDisponibilidadeServico')

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

    /**
     * Verifica a disponibilidade do serviço para o CEP de destino
     * O cepOrigem não nãé obrigatótio
     *
     * @params {Object} data { cepDestino, numeroServico, cepOrigem=? }
     */
    verificaDisponibilidadeServico = async ( data ) => {
        data = helpers.clearCEP( data )

        let userData = this.user.getUser()
        let params = {
            ...userData,
            ...data
        }

        return await VerificaDispService( params )
    }

    /**
     * Metodo retorna o endereço do CEP pesquisado
     * @params {String} cep CEP que deseja encontrar o endereço
     * @returns {Object}
     */
    consultaCEP = async ( cep ) => {
        cep = helpers.clearCEP( cep )

        let result = await ConsultaCEPService(cep)

        return result
    }

    solicitaEtiquetas = () => {

    }

    geraDigitoVerificadorEtiquetas = () => {

    }

    fechaPlpVariosServicos = () => {

    }

    calcPrecoPrazo = () => {

    }

    /**
     * Metodo retorna os dados do client inicializados na instacia do modulo
     * @returns {Object}
     */
    buscaCliente = async () => {
        let userData = this.user.getUser()
        let result = await BuscaClienteService( userData )

        if( Object.keys( userData.clienteData ).length === 0 ){
            this.user._setClienteData( result )
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
