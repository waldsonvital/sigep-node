/**
 * @author waldson vital dos santos
 */
const xml = require('xml-js')
const soap = require('soap')
const config = require('../../config.json')[process.env.NODE_ENV]

/**
 * chama o serviço dos correios plp
 */
async function callSoap({ xml, idPlpCliente, cartaoPostagem, listaEtiquetas, usuario, senha }){

}


module.exports = async ( dataSend, userInfo ) => {
    let objSend = {
        correioslog:{
            tipo_arquivo: 'Postagem',
            versao_arquivo: 2.3,
            plp: {
                id_plp: '',
                valor_global: '',
                mcu_unidade_postagem: '',
                nome_unidade_postagem: '',
                cartao_postagem: userInfo.idCartaoPostagem
            },
            remetente:{
                numero_contrato:'',
                numero_diretoria: '',
                codigo_administrativo: '',
                nome_remetente:'',
                logradouro_remetente: '',
                numero_remetente:'',
                complemento_remetente:'',
                bairro_remetente:'',
                cep_remetente:'',
                cidade_remetente:'',
                uf_remetente:'',
                telefone_remetente:'',
                fax_remetente:'',
                email_remetente:'',
                celular_remetente:'',
                cpf_cnpj_remetente:'',
                ciencia_conteudo_proibido:''
            },
            forma_pagamento:''
        }
    }
    if( dataSend.length === 1000 ){
        throw Error("limite de 1000 encomendas por PLP")
    }
}
