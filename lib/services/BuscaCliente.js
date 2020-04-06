/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]

/**
 * Busca Cliente
 * @args {Object} data { idContrato, idCartaoPostagem, usuario, senha }
 */
module.exports = async ( data ) => {
    let params = {
        idContrato: data.idContrato,
        idCartaoPostagem: data.idCartaoPostagem,
        usuario: data.usuario,
        senha: data.senha
    }

    let functions = soap.createClientAsync(config.url)
    let result = await functions.buscaClienteAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return result.return
}
