/**
 * @author Waldson Vital dos Santos
 */
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]

/**
 * O sistema gera o digito verificador
 * @params {String} tag Envia a etiqueta para gerar o digito
 */
function geraDigito( tag ){
    tag = tag.replace(' ', '')
    //dividindo a etiqueta
    let prefixo = tag.substring(0, 2)
    let numero = tag.substring(2, 10)
    let sufixo = tag.substring(10).replace(' ', '')

    //retornos
    let retorno
    let dv
    let multiplicadores = [ 8, 6, 4, 2, 3, 5, 9, 7 ]
    let soma = 0

    if( tag.length < 12){
        throw Error('Etiqueta enviada não é válida')
    }else if( numero.length < 8 && tag.length === 12 ){
        let zeros = ''
        let diferenca = 8 - numero.length

        for(let i = 0; i < diferenca; i++){
            zeros += '0'
        }

        retorno = zeros + numero
    }else{
        retorno = numero.substring(0, 8)
    }

    for(let i=0; i < 8; i++){
        soma += parseInt(retorno.substring(i, (i+1))) * multiplicadores[i];
    }

    let resto = soma % 11;
    if(resto == 0){
        dv = "5";
    }else if(resto == 1){
        dv = "0";
    }else{
        dv = parseInt(11 - resto).toString();
    }

    retorno += dv;
    retorno = prefixo + retorno + sufixo;
    return retorno;
}

/**
 * Metodo chama a api dos correios para gerar o digito verificador
 * @params {Object} data { tags, usuario, senha }
 */
async function callGerarDigitos(data){
    let params = {
        etiquetas: data.tags,
        usuario: data.usuario,
        senha: data.senha
    }

    let functions = soap.createClientAsync(config.url)
    let result = await functions.geraDigitoVerificadorEtiquetasAsync( params )

    if( Array.isArray( result ) ){
        result = result[0]
    }

    return result.return

}

module.exports = {
    geraDigito,
    callGerarDigitos
}
