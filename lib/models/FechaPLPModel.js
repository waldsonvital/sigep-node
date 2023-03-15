module.exports.base = {
    correioslog:{
        tipo_arquivo: 'Postagem',
        versao_arquivo: 2.3,
        plp: {
            id_plp: '',
            valor_global: '',
            mcu_unidade_postagem: '',
            nome_unidade_postagem: '',
            cartao_postagem: ''
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
        forma_pagamento:'',
        objeto_postal:[],
    }
}

module.exports.objeto_postal_item = {
    numero_etiqueta: '',
    sscc: '',
    codigo_objeto_cliente:'',
    codigo_servico_postagem:'',
    cubagem:'',
    peso:'',
    rt1:'',
    rt2:'',
    restricao_anac: 'S',
    destinatario:{
        nome_destinatario:'',
        telefone_destinatario: '',
        celular_destinatario:'',
        email_destinatario:'',
        logradouro_destinatario:'',
        complemento_destinatario:'',
        numero_end_destinatario:''
    },
    nacional:{
        bairro_destinatario:'',
        cidade_destinatario:'',
        uf_destinatario:'',
        cep_destinatario:'',
        codigo_usuario_postal:'',
        centro_custo_cliente:'',
        numero_nota_fiscal:'',
        serie_nota_fiscal:'',
        valor_nota_fiscal:'',
        natureza_nota_fiscal:'',
        descricao_objeto:'',
        valor_a_cobrar:'',
    },
    servico_adicional:{
        codigo_servico_adicional:[],
        valor_declarado:''
    },
    dimensao_objeto:{
        tipo_objeto:'',
        dimensao_altura:'',
        dimensao_largura:'',
        dimensao_comprimento:'',
        dimensao_diametro:''
    },
    data_postagem_sara:'',
    status_processamento:'0',
    numero_comprovante_postagem: '',
    valor_cobrado: ''
}
