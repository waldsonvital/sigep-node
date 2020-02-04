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

        expect(data).toMatchObject({
            cnpj: expect.any(String),
            contratos: expect.any(Array),
            descricaoStatusCliente: expect.any(String)
        })
    })

    it('Check zip code at services correios and get address:', async () => {
        let address = await SIGEP.consultaCEP('13469740')

        expect( address ).toMatchObject({
            cep: expect.any(String),
            end: expect.any(String)
        })
    })

    it('Service availability between the source zip code and destination zip code:', async () => {
        let disp = await SIGEP.verificaDisponibilidadeServico({
            cepDestino: '09720-010',
            numeroServico: '40215'
        })

        expect( disp ).toMatchObject({
            status: expect.any(Boolean),
            message: expect.any(String)
        })
    })

    it('check availability card post', async () => {
        let card = await SIGEP.verificarStatusCartaoPostagem()

        expect( card).toMatchObject({
            status: expect.any(Boolean),
            situacao: expect.any(String)
        })
    })
})
