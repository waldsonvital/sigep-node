/**
 * @author waldson vital dos santos
 */
const convert = require('xml-js')
const soap = require('soap')
const config = require('../../config.json')
const libxml = require("libxmljs")
const xsd = require('../utils/xsd')

module.exports = async ({ json, idPlpCliente, cartaoPostagem, listaEtiquetas, usuario, senha } ) => {
    if( json.correioslog.objeto_postal.length > 1000 ){
        throw Error("limite de 1000 encomendas por PLP")
    }else if(json.correioslog.objeto_postal.length === 0){
        throw Error('O campo objeto_postal é obrigatótio')
    }

    let options = {compact: true, ignoreComment: true, spaces: 0};

    let xml = convert.json2xml(json, options);
    xml = '<?xml version="1.0" encoding="ISO-8859-1" ?>' + xml

    let xsdDoc = libxml.parseXml(xsd)
    let xmlDocValid = libxml.parseXml(xml)

    if( xmlDocValid.validate( xsdDoc)){
        let params = {
            xml,
            idPlpCliente,
            cartaoPostagem,
            listaEtiquetas,
            usuario,
            senha
        }

        let functions = await soap.createClientAsync( config[ENV_SIGEP].url )
        let result = await functions.fechaPlpVariosServicosAsync( params )

        if(Array.isArray( result )){
            result = result[0]
        }

        return result.return
    }else{
        throw Error(xmlDocValid.validationErrors)
    }
}
