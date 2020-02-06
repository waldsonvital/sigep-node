//import module
const mod = require('../index')

//dodos da documentação dos correios
const SIGEP = mod.init({
    usuario: 'sigep',
    senha: 'n5f9t8',
    codAdministrativo: '17000190',
    idContrato: '9992157880',
    idCartaoPostagem: '0067599079',
    identificador: '34028316000103', //cnpj,
    cepOrigem: '13469740'
})

describe('sigep tests', () => {
    it('Get client SIGEP:', async () => {
        let data = await SIGEP.buscaCliente()

        //console.log( "buscaCliente", data )

        expect(data).toMatchObject({
            cnpj: expect.any(String),
            contratos: expect.any(Array),
            descricaoStatusCliente: expect.any(String)
        })
    })

    it('Check zip code at services correios and get address:', async () => {
        let address = await SIGEP.consultaCEP('13469740')

        //console.log( "consultaCEP", address )

        expect( address ).toMatchObject({
            cep: expect.any(String),
            end: expect.any(String)
        })
    })

    it('Service availability between the source zip code and destination zip code:', async () => {
        let disp = await SIGEP.verificaDisponibilidadeServico({
            cepDestino: '09720-010',
            numeroServico: '40878'
        })

        //console.log( "verificaDisponibilidadeServico", disp )

        expect( disp ).toMatchObject({
            status: expect.any(Boolean),
            message: expect.any(String)
        })
    })

    it('Check availability card post', async () => {
        let card = await SIGEP.verificarStatusCartaoPostagem()

        //console.log( "verificarStatusCartaoPostagem", card)

        expect( card ).toMatchObject({
            status: expect.any(Boolean),
            situacao: "Normal"
        })
    })

    it('Request tags list', async () => {
        let tags = await SIGEP.solicitaEtiquetas({
            qtdEtiquetas: 2,
            idServico: '124849'
        })

        //console.log( "solicitaEtiquetas", tags )

        expect( tags ).toMatchObject({
            status: expect.any(Boolean),
            data: expect.any(Array)
        })
    })

    it('Request time and price to shipping', async () => {
        let calc = await SIGEP.calcPrecoPrazo({
            nCdEmpresa: '',
            sDsSenha: '',
            nCdServico: '04014',
            sCepOrigem: '30170-010',
            sCepDestino: '04538-132',
            nVlPeso: .01,
            nCdFormato: 3,
            nVlComprimento: 0,
            nVlAltura: 5,
            nVlLargura: 5,
            nVlDiametro: 0,
            sCdMaoPropria: 'N',
            nVlValorDeclarado: 0,
            sCdAvisoRecebimento: 'N'
        })

        expect(calc).toMatchObject({
            Erro: '0',
        })
    })
})
