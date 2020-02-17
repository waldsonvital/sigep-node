class ServicoPostagem {
    servicos = {
        '41068': {name:'Pac', code: '41068', id: '109819'},
        '04510': {name:'Pac', code: '04510', id: '124887'},
        '41300': {name:'Pac Grandes Formatos', code: '41300', id: '120366'},
        '04693': {name:'Pac Contrato Grandes Formatos', code: '04693', id: '125248'},
        '04812': {name:'Pac Contrato - UO', code: '04812', id: '124899'},
        '41556': {name:'Sedex', code: '41556', id: '121877'},
        '40169': {name:'Sedex 12', code: '40169', id: '115218'},
        '40215': {name:'Sedex 10', code: '40215', id: '104707'},
        '40886': {name:'Sedex 10 Pacote', code: '40886', id: ''},
        '40290': {name:'Sedex Hoje', code: '40290', id: '108934'},
        '40878': {name:'Sedex Hoje', code: '40878', id: ''},
        '04014': {name:'Sedex a vista', code: '04014', id: '104295'},
        '40045': {name:'Sedex Varejo a Cobrar', code: '40045', id: ''},
        '41009': {name:'Sedex Agrupado', code: '41009', id: '119461'},
        '40380': {name:'Sedex Reverso', code: '40380', id: '109806'},
        '04685': {name:'Sedex Pagamento na Entrega', code: '04685', id: '114976'},
        '04316': {name:'Sedex Contrato - UO', code: '04316', id: '124900'},
        '04685': {name:'PAC Pagamento na Entrega', code: '04685', id: '114976'},
        '10065': {name:'Carta Comercial a Faturar', code: '10065', id: '109480'},
        '10014': {name:'Carta Registrada', code: '10014', id: '116985'},
        '04162': {name:'SEDEX Contrato Agência', code: '04162', id: '124849'},
        '04669': {name:'PAC Contrato Agência', code: '04669', id: '124884'},
        '04170': {name:'SEDEX Reverso Contrato Agência', code: '04170', id: '124849'},
        '04677': {name:'PAC Reverso Contrato Agência', code: '04677', id: '124884'},
        '12556': {name:'Carta Comerical Registrada a Faturar', code: '12556', id: '160104'},
        '10707': {name:'Carta Comercial Registrada CTR EP MÁQ FRAN', code: '10707', id: '120072'},
        '04146': {name:'SEDEX Contrato Grandes Formatos (Liminar ABCOMM)', code: '04146', id: ''},
        '04154': {name:'SEDEX Contrato Agência (Liminar ABCOMM)', code: '04154', id: '160126'},
        '04243': {name:'SEDEX Reverso (Liminar ABCOMM)', code: '04243', id: ''},
        '04278': {name:'SEDEX Contrato UO (Liminar ABCOMM)', code: '04278', id: ''},
        '04883': {name:'PAC Contrato Grandes Formatos (Liminar ABCOMM)', code: '04883', id: ''},
        '04367': {name:'PAC Contrato Agência (Liminar ABCOMM)', code: '04367', id: '160123'},
        '04375': {name:'PAC Reverso (Liminar ABCOMM)', code: '04375', id: ''},
        '04332': {name:'PAC Contrato UO (Liminar ABCOMM)', code: '04332', id: ''},
        '04151': {name:'SEDEX Contrato Agencia Pagamento na Entrega (Liminar ABCOMM)', code: '04151', id: ''},
        '04308': {name:'PAC Contrato Agencia Pagamento na Entrega (Liminar ABCOMM)', code: '04308', id: ''},
        '04553': {name:'SEDEX Contrato Agencia TA ', code: '04553', id: '161274'},
        '04596': {name:'PAC Contrato Agencia TA', code: '04596', id: '161277'},
    }

    getService = ( code ) => {
        return this.servicos[code]? this.servicos[code] : null
    }
}


module.exports = ServicoPostagem
