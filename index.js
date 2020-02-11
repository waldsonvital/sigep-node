/**
 * @author Walson Vital dos Santos
 */

//class
const User = require('./lib/class/User')

module.exports = {
    /**
     * Init SIGEP Instance
     * @param {Object} data { usuario, senha, codAdministrativo, idContrato, idCartaoPostagem, identificador, cepOrigem }
     */
    init: User.init,
}
