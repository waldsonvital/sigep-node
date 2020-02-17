/**
 * @author Walson Vital dos Santos
 */

//class
const User = require('./lib/class/User')
const Print = require('./lib/class/PrintPDF')

module.exports = {
    /**
     * Init SIGEP Instance
     * @param {Object} data { usuario, senha, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem }
     */
    init: User.init,
    pdfPLP: (idPLP, PLP, path, filename) => {
        return new Print(idPLP, PLP, path, filename)
    }
}
