/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')
const convert = require('xml-js')

/**
 * Busca Cliente
 * @args {Object} data { idContrato, idCartaoPostagem, usuario, senha }
 */
module.exports = async ( data ) => {
    let params = {
        idPlpMaster: data.idPlpMaster,
        usuario: data.usuario,
        senha: data.senha
    }

    let functions = await soap.createClientAsync( config[ENV_SIGEP].url )
    let result = await functions.solicitaXmlPlpAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    result = convert.xml2json( result.return )

    return result
}
