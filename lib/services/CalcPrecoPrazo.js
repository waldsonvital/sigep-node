/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')

/**
 * Calcula preço e prazos
 */
module.exports = async ( data ) => {
    let params = {
        nCdEmpresa: data.nCdEmpresa? data.nCdEmpresa : '',
        sDsSenha: data.sDsSenha? data.sDsSenha : '',
        nCdServico: data.nCdServico,
        sCepOrigem: data.sCepOrigem,
        sCepDestino: data.sCepDestino,
        nVlPeso: data.nVlPeso,
        nCdFormato: data.nCdFormato,
        nVlComprimento: data.nVlComprimento,
        nVlAltura: data.nVlAltura,
        nVlLargura: data.nVlLargura,
        nVlDiametro: data.nVlDiametro,
        sCdMaoPropria: data.sCdMaoPropria,
        nVlValorDeclarado: data.nVlValorDeclarado,
        sCdAvisoRecebimento: data.sCdAvisoRecebimento
    }

    let functions = soap.createClientAsync( config.calc_url )
    let result = await functions.CalcPrecoPrazoAsync( params )

    if(Array.isArray( result )){
        result = result[0]
    }

    return result.CalcPrecoPrazoResult.Servicos.cServico[0]
}
