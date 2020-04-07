/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')

module.exports = async ( data ) => {
    let params = {
        numeroCartaoPostagem: data.idCartaoPostagem,
        usuario: data.usuario,
        senha: data.senha
    }

    let functions = await soap.createClientAsync( config[ENV_SIGEP].url )
    let result = await functions.getStatusCartaoPostagemAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return result.return === 'Normal'? { status: true, situacao: 'Normal' } : { status: false, situacao: 'Cancelado' }
}
