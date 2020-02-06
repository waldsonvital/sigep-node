/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]

/**
 * Solicita as Etiquetas
 * @args {Object} data { tipoDestinatario, identificador, idServico, qtdEtiquetas, usuario, senha }
 */
module.exports = async ( data ) => {
    let params = {
        tipoDestinatario: 'C',
        identificador: data.identificador,
        idServico: data.idServico,
        qtdEtiquetas: data.qtdEtiquetas,
        usuario: data.usuario,
        senha: data.senha
    }

    let functions = await soap.createClientAsync(config.url)
    let result = await functions.solicitaEtiquetasAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return typeof result.return === 'string'? result.return.split(',') : []
}
