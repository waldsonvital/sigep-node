//import module
const mod = require('../index')

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
    it('Check service status', async () => {

        console.log( await SIGEP.buscaCliente() )
    })
})
