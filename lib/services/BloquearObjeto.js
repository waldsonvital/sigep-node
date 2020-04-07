/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')

const bloquear = async ( etiqueta, idPLP, usuario, senha ) => {
        let params ={
            numeroEtiqueta: etiqueta,
            idPlp: idPLP,
            tipoBloqueio: 'FRAUDE_BLOQUEIO',
            acao: 'DEVOLVIDO_AO_REMETENTE',
            usuario: usuario,
            senha: senha
        }

        let functions = await soap.createClientAsync( config.url[ ENV_SIGEP ] )
        let result = await functions.solicitaXmlPlpAsync( params )

        if( Array.isArray( result ) ){
            result = result[0]
        }

        return result.return

    }

module.exports = bloquear
