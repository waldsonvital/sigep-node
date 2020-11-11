
/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')

/**
 * Busca CEP
 * @args {String} cep
 */
module.exports = async ( data ) => {
    let params = {
        senha: data.senha,
        idCartaoPostagem: data.idCartaoPostagem,
        usuario: data.usuario,
        idContrato: data.idContrato
    }

    let functions = await soap.createClientAsync( config[ENV_SIGEP].url )
    let result = await functions.buscaClienteAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return result.return
}
