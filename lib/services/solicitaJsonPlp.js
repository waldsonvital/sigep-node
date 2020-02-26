/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]
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

    let functions = await soap.createClientAsync(config.url)
    //console.log( params )
    let result = await functions.solicitaXmlPlpAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    result = convert.xml2json( result.return )

    return result
}
