class ServicoPostagem {
    constructor(){
        this.servicos = {
            //pac
            '41068': { type: "pac", name:'Pac', code: '41068', id: '109819'},
            '04510': { type: "pac", name:'Pac', code: '04510', id: '124887'},
            '41300': { type: "pac", name:'Pac Grandes Formatos', code: '41300', id: '120366'},
            '04693': { type: "pac", name:'Pac Contrato Grandes Formatos', code: '04693', id: '125248'},
            '04308': { type: "pac", name:'PAC Contrato Agencia Pagamento na Entrega (Liminar ABCOMM)', code: '04308', id: ''},
            '04596': { type: "pac", name:'PAC Contrato Agencia TA', code: '04596', id: '161277'},
            '04812': { type: "pac", name:'Pac Contrato - UO', code: '04812', id: '124899'},
            '04669': { type: "pac", name:'PAC Contrato Agência', code: '04669', id: '124884'},
            '04677': { type: "pac", name:'PAC Reverso Contrato Agência', code: '04677', id: '124884'},
            '04883': { type: "pac", name:'PAC Contrato Grandes Formatos (Liminar ABCOMM)', code: '04883', id: ''},
            '04367': { type: "pac", name:'PAC Contrato Agência (Liminar ABCOMM)', code: '04367', id: '160123'},
            '04375': { type: "pac", name:'PAC Reverso (Liminar ABCOMM)', code: '04375', id: ''},
            '04332': { type: "pac", name:'PAC Contrato UO (Liminar ABCOMM)', code: '04332', id: ''},
            '04685': { type: "pac", name:'PAC Pagamento na Entrega', code: '04685', id: '114976'},
            '04618': { type: "pac", name:'PAC CONTRATO GRANDES FORMATO', code: '04618', id: '161279'},
            '03298': { type: "pac", name:'PAC CONTRATO AG', code: '03298', id: '162026'},

            //sedex
            '41556': { type: "sedex", name:'Sedex', code: '41556', id: '121877'},
            '04146': { type: "sedex", name:'SEDEX Contrato Grandes Formatos (Liminar ABCOMM)', code: '04146', id: ''},
            '04154': { type: "sedex", name:'SEDEX Contrato Agência (Liminar ABCOMM)', code: '04154', id: '160126'},
            '04243': { type: "sedex", name:'SEDEX Reverso (Liminar ABCOMM)', code: '04243', id: ''},
            '04278': { type: "sedex", name:'SEDEX Contrato UO (Liminar ABCOMM)', code: '04278', id: ''},
            '04151': { type: "sedex", name:'SEDEX Contrato Agencia Pagamento na Entrega (Liminar ABCOMM)', code: '04151', id: ''},
            '04553': { type: "sedex", name:'SEDEX Contrato Agencia TA ', code: '04553', id: '161274'},
            '04162': { type: "sedex", name:'SEDEX Contrato Agência', code: '04162', id: '124849'},
            '04170': { type: "sedex", name:'SEDEX Reverso Contrato Agência', code: '04170', id: '124849'},
            '04014': { type: "sedex", name:'Sedex a vista', code: '04014', id: '104295'},
            '40045': { type: "sedex", name:'Sedex Varejo a Cobrar', code: '40045', id: ''},
            '41009': { type: "sedex", name:'Sedex Agrupado', code: '41009', id: '119461'},
            '40380': { type: "sedex", name:'Sedex Reverso', code: '40380', id: '109806'},
            '04685': { type: "sedex", name:'Sedex Pagamento na Entrega', code: '04685', id: '114976'},
            '04316': { type: "sedex", name:'Sedex Contrato - UO', code: '04316', id: '124900'},
            '04537': { type: "sedex", name:'SEDEX CONTRATO GRANDES FORMATO', code: '04537', id: '161273'},
            '03220': { type: "sedex", name:'SEDEX CONTRATO AG', code: '03220', id: '162022'},

            //carta
            '10065': { type: "outros", name:'Carta Comercial a Faturar', code: '10065', id: '109480'},
            // '10014': { type: "outros", name:'Carta Registrada', code: '10014', id: '116985'},
            '10138': { type: "outros", name:'Carta Registrada', code: '10138', id: '116985'},
            '80284': { type: "outros", name:'CARTA RG AR CONV B1 CHAN ETIQ', code: '80284', id: '162144'},
            '80411': { type: "outros", name:'CARTA RG AR CONV PR2 CHAN ETIQ', code: '80411', id: '162152'},
            '12556': { type: "outros", name:'Carta Comerical Registrada a Faturar', code: '12556', id: '160104'},
            '10707': { type: "outros", name:'Carta Comercial Registrada CTR EP MÁQ FRAN', code: '10707', id: '120072'},

            //sedex premium
            '40169': { type: "premium", name:'Sedex 12', code: '40169', id: '115218'},
            '40215': { type: "premium", name:'Sedex 10', code: '40215', id: '104707'},
            '40886': { type: "premium", name:'Sedex 10 Pacote', code: '40886', id: ''},
            '40290': { type: "premium", name:'Sedex Hoje', code: '40290', id: '108934'},
            '40878': { type: "premium", name:'Sedex Hoje', code: '40878', id: ''},
        }

        this.getService = this.getService.bind( this )
        this.getServiceByID = this.getServiceByID.bind( this )
    }


    getService( code ){
        return this.servicos[code]? this.servicos[code] : null
    }

    getServiceByID( id ){
        let find = null
        for(let index in this.servicos){

            if( index === String( id )){
                find = this.servicos[index]
            }
        }

        if( find === undefined || find === null){
            for(let index in this.servicos){

                if( this.servicos[index].id === String( id )){
                    find = this.servicos[index]
                }
            }
        }

        return find
    }
}


module.exports = ServicoPostagem