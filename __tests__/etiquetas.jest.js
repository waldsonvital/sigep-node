const jsonPLP = {
    correioslog:{
        tipo_arquivo: 'Postagem',
        versao_arquivo: 2.3,
        plp: {
            id_plp: '44022831',
            valor_global: '',
            mcu_unidade_postagem: '',
            nome_unidade_postagem: '',
            cartao_postagem: '0067599079'
        },
        remetente:{
            numero_contrato: '9992157880',
            numero_diretoria: '10',
            codigo_administrativo: '17000190',
            nome_remetente: 'Empresa Teste',
            logradouro_remetente: 'Avenida Central',
            numero_remetente: '2370',
            complemento_remetente:'Sala 1205, 12°andar',
            bairro_remetente:'Centro',
            cep_remetente: '80002900',
            cidade_remetente:'Curitiba',
            uf_remetente:'PR',
            telefone_remetente:'4130795008',
            fax_remetente:'4191239321',
            email_remetente:'cli@mail.com.br',
            celular_remetente:'',
            // cpf_cnpj_remetente:"12345678901234",
            // ciencia_conteudo_proibido: 'S'
        },
        forma_pagamento: '5',
        objeto_postal:[
            {
                numero_etiqueta: 'SZ806005334BR',
                // sscc: '',
                codigo_objeto_cliente:'',
                codigo_servico_postagem:'41068',
                cubagem: '0,00',
                peso:'2',
                rt1:'',
                rt2:'',
                destinatario:{
                    nome_destinatario: 'José teste da silva',
                    telefone_destinatario: '6232339644',
                    celular_destinatario:'62991239321',
                    email_destinatario:'js_teste@gmail.com',
                    logradouro_destinatario: 'Rua Humberto polo',
                    complemento_destinatario:'Sobrado',
                    numero_end_destinatario:'91',
                    // cpf_cnpj_destinatario:'',
                    // restricao_anac:'S'
                },
                nacional:{
                    bairro_destinatario:'Sao Jeronimo',
                    cidade_destinatario:'Americana',
                    uf_destinatario:'SP',
                    cep_destinatario:'13469730',
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
                    codigo_servico_adicional:[ '025' ],
                    valor_declarado:''
                },
                dimensao_objeto:{
                    tipo_objeto:'001',
                    dimensao_altura:'2',
                    dimensao_largura:'11',
                    dimensao_comprimento:'16',
                    dimensao_diametro:'5'
                },
                data_postagem_sara:'',
                status_processamento:'0',
                numero_comprovante_postagem: '',
                valor_cobrado: '0'
            },

            {
                numero_etiqueta: 'SZ806005348BR',
                // sscc: '',
                codigo_objeto_cliente:'',
                codigo_servico_postagem:'41068',
                cubagem: '0,00',
                peso:'2',
                rt1:'',
                rt2:'',
                destinatario:{
                    nome_destinatario: 'Maria do Teste',
                    telefone_destinatario: '6232339644',
                    celular_destinatario:'62991239321',
                    email_destinatario:'maria_teste@gmail.com',
                    logradouro_destinatario: 'Rua Humberto polo',
                    complemento_destinatario:'Sobrado',
                    numero_end_destinatario:'91',
                    // cpf_cnpj_destinatario:'',
                    // restricao_anac:'S'
                },
                nacional:{
                    bairro_destinatario:'Sao Jeronimo',
                    cidade_destinatario:'Americana',
                    uf_destinatario:'SP',
                    cep_destinatario:'13469740',
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
                    codigo_servico_adicional:[ '025', '001' ],
                    valor_declarado:''
                },
                dimensao_objeto:{
                    tipo_objeto:'001',
                    dimensao_altura:'2',
                    dimensao_largura:'11',
                    dimensao_comprimento:'16',
                    dimensao_diametro:'5'
                },
                data_postagem_sara:'',
                status_processamento:'0',
                numero_comprovante_postagem: '',
                valor_cobrado: '0'
            },
        ],
    }
}

const path = require('path')
const dir = path.dirname(__dirname)
const SIGEPPDF = require('../index').pdfPLP( '44022831', jsonPLP, dir + '/__tests__/tmp/', 'teste_sigep'  )
const helperTest = require('../lib/class/helpers')

describe('Print tags', () => {
    jest.setTimeout(5000000)
    it('test function formatRegex', () => {
        let help = new helperTest()

        help.format('SZ806005348BR', 'rastreio')
    })

    it('generate pdf tags', async () => {
        await SIGEPPDF.tagsToPDF( dir + '/__tests__/tmp/arquivo.pdf' )
        await SIGEPPDF.voucherToPDF( dir + '/__tests__/tmp/arquivo_voucher.pdf', '20/01/2020' )
    })
})
