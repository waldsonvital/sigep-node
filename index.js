/**
 * @author Walson Vital dos Santos
 */

//class
const User = require('./lib/class/User')
const Print = require('./lib/class/PrintPDF')
const buscaCliente = require('./lib/services/BuscaCliente')

global.ENV_SIGEP = "production"

module.exports = {
    /**
     * Init SIGEP Instance
     * @param {Object} data { usuario, senha, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem }
     */
    init: User.init,
    buscaCliente,
    pdfPLP: (idPLP, PLP, path, filename) => {
        return new Print(idPLP, PLP, path, filename)
    }
}
