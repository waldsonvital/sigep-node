/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]

/**
 * Busca CEP
 * @args {String} cep
 */
module.exports = async ( cep ) => {
    let params = {
        cep
    }

    let functions = await soap.createClientAsync(config.url)
    let result = await functions.consultaCEPAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return result.return
}
