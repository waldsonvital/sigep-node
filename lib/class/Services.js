/**
 * @author: waldson Vital
 */

const Helper = require('./helpers')
const BuscaClienteService = require('../services/BuscaCliente')
const ConsultaCEPService = require('../services/ConsultaCep')
const VerificaDispService = require('../services/VerificaDisponibilidadeServico')
const VerificaDispCardService = require('../services/verificaStatusCartaoPostagem')
const SolicitarEtiquetas = require('../services/SolicitaEtiquetas')
const CalcPrecoPrazo = require('../services/CalcPrecoPrazo')
const { geraDigito, callGerarDigitos } = require('../services/GeraDigitoVerificador')
const FechaPlp = require('../services/FechaPlp')
const SolicitaJsonPLP = require('../services/solicitaJsonPlp')
const bloquearObjetos = require('../services/BloquearObjeto')
const getContrato = require("../services/GetContratos")

const { base, objeto_postal_item } = require('../models/FechaPLPModel')
const servicoPostagemModel = require('../models/ServicoPostagemModel')
/**
 * @class: Services
 * @classdesc: Serviços disponivel dos SIGEP
 */
class Services {
    constructor(user){
        this.user = user
        this.PLPModel = {
            plp: base,
            objetoPostal: objeto_postal_item
        }

        //init nos dados do client
        this.buscaCliente()
        this.helpers = new Helper( this.user )
        this.contratos = null

        //bind
        this.verificaDisponibilidadeServico = this.verificaDisponibilidadeServico.bind( this )
        this.consultaCEP = this.consultaCEP.bind( this )
        this.solicitaEtiquetas = this.solicitaEtiquetas.bind( this )
        this.geraDigitoVerificadorEtiquetas = this.geraDigitoVerificadorEtiquetas.bind( this )
        this.fechaPlpVariosServicos = this.fechaPlpVariosServicos.bind( this )
        this.solicitaJsonPlp = this.solicitaJsonPlp.bind( this )
        this.calcPrecoPrazo = this.calcPrecoPrazo.bind( this )
        this.buscaCliente = this.buscaCliente.bind( this )
        this.rastrearObjeto = this.rastrearObjeto.bind( this )
        this.verificarStatusCartaoPostagem = this.verificarStatusCartaoPostagem.bind( this )
        this.bloquearObjeto =  this.bloquearObjeto.bind( this )
        this.cancelarObjeto = this.cancelarObjeto.bind( this )
    }

    /**
     * Verifica a disponibilidade do serviço para o CEP de destino
     * O cepOrigem não nãé obrigatótio
     *
     * @params {Object} data { cepDestino, numeroServico, cepOrigem=? }
     */
    async verificaDisponibilidadeServico( data ){
        let userData = this.user.getUser()
        let params = {
            ...userData,
            ...data
        }

        params = this.helpers.clearCEP( params )

        return await VerificaDispService( params )
    }

    /**
     * Metodo retorna o endereço do CEP pesquisado
     * @params {String} cep CEP que deseja encontrar o endereço
     * @returns {Object}
     */
    async consultaCEP( cep ){
        cep = this.helpers.clearCEP( cep )

        let result = await ConsultaCEPService(cep)

        return result
    }

    getUser(){
        return this.user.getContrato()
    }

    async solicitaEtiquetas(data){
        let userData = this.user.getUser()
        let params = {
            ...userData,
            ...data
        }

        let result = await SolicitarEtiquetas( params )

        return {
            status: result.length? true : false,
            data: result
        }
    }

    geraDigitoVerificadorEtiquetas( listTags ){
        return listTags.map(( tag ) => {
            return geraDigito(tag)
        })
    }

    async fechaPlpVariosServicos({ json, idPlpCliente, listaEtiquetas,}){
        let user = this.user.getUser()

        let data = {
            json,
            idPlpCliente,
            cartaoPostagem: user.idCartaoPostagem,
            listaEtiquetas,
            usuario: user.usuario,
            senha: user.senha
        }

        return await FechaPlp(data)
    }

    async solicitaJsonPlp( idPLP ){
        let user = this.user.getUser()

        let params = {
            idPlpMaster: idPLP,
            ...user
        }

        return await SolicitaJsonPLP( params )
    }

    /**
     * Calcula o Prazo e Valor do Frete
     *
     * @params {Object} params
     *
     * campos do objeto:
     * nCdEmpresa - numero do contrato ( não obrigatório - envie '' )
     * sDsSenha - senha do contrato, pode ser os 8 primeiros digitos do CNPJ ( não obrigatório - envie '' )
     * nCdServico - código do serviço
     * sCepOrigem - CEP de origem
     * sCepDestino - CEP de Destino
     * nVlPeso - Decimal ex: 1 = 1kg
     * nCdFormato - 1 – Formato caixa/pacote, 2 – Formato rolo/prisma, 3 – Envelope
     * nVlComprimento - Decimal ex: 1 = 1cm
     * nVlAltura = Decimal ex: 1 = 1cm
     * nVlLargura = Decimal ex: 1 = 1cm
     * nVlDiametro = Decimal ex: 1 = 1cm
     * sCdMaoPropria = "S" = sim, "N" = não
     * nVlValorDeclarado = Decimal ex: 1 = R$1,00
     * sCdAvisoRecebimento = "S" = sim, "N" = não
     */
    async calcPrecoPrazo( params ){
        //limpa os ceps
        params.sCepOrigem = this.helpers.clearCEP( params.sCepOrigem )
        params.sCepDestino = this.helpers.clearCEP( params.sCepDestino )

        return await CalcPrecoPrazo( params )
    }

    /**
     * Metodo retorna os dados do client inicializados na instacia do modulo
     * @returns {Object}
     */
    async buscaCliente( userSend = null ){
        let userData = userSend || this.user.getUser()
        let result = await BuscaClienteService( userData )
        let contratos = await getContrato( userData )

        this.contratos = contratos

        if( Object.keys( userData.clienteData ).length === 0 ){
            this.user._setClienteData( {
                ...result,
                contratos
            })
        }

        return result
    }

    rastrearObjeto(){

    }

    /**
     * Verifica a disponibilidade do cartão de postagem
     *
     * @params {String} idCartaoPostagem Campo não obrigatorio do id do cartão de postagem
     * @returns {Object}
     */
    async verificarStatusCartaoPostagem( idCartaoPostagem = null ){
        let user = this.user.getUser()

        if( idCartaoPostagem ){
            user.idCartaoPostagem = idCartaoPostagem
        }

        return await VerificaDispCardService( user )
    }

    async bloquearObjeto( etiqueta, idPLP ){
        let user = this.user.getUser()

        let result = await bloquearObjetos( etiqueta, idPLP, user.usuario, user.senha )

        return result
    }

    cancelarObjeto(){

    }

    async getServiceByID( id ){
        let userData = this.user.getUser()
        let contratos = null
        let servicos = null
        let service = new servicoPostagemModel()

        if( this.contratos ){
            if( userData.identificador === this.contratos.cnpj ){
                contratos = this.contratos
            }else{
                contratos = await getContrato( userData )
                this.contratos = { ...contratos }
            }

        }else{
            contratos = await getContrato( userData )
            this.contratos = { ...contratos }
        }

        servicos = contratos.contratos[0].cartoesPostagem[0].servicos

        let filter = servicos.filter(( v, i ) => {
            return v.id === String(id)
        })

        if( filter.length === 0){
            let findFilter = service.getServiceByID( id )

            if( findFilter ){
                filter.push( {
                    type: findFilter.type,
                    name: findFilter.name,
                    code: findFilter.code,
                    id: findFilter.id
                })
            }
        }else{
            filter = filter.map(( v ) => {
                let data = service.getServiceByID( v.codigo )

                return  {
                    type: data.type,
                    name: v.servicoSigep.descricao,
                    code: v.codigo,
                    id: v.id
                }
            })
        }

        return filter[0]
    }
}

module.exports = Services
