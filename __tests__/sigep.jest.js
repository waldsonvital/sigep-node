//import module
const mod = require('../index')

//Dados da documentação dos correios

//Init da lib
const SIGEP = mod.init({
    usuario: 'sigep',
    senha: 'n5f9t8',
    codAdministrativo: '17000190',
    idContrato: '9992157880',
    idCartaoPostagem: '0067599079',
    identificador: '34028316000103', //cnpj,
    cepOrigem: '70002-900',
    env: "development" //ambiente de homologação
})

describe('sigep tests', () => {
    jest.setTimeout(5000000)

    test('Get client SIGEP:', async () => {
        let data = await SIGEP.buscaCliente()

        // console.log( data.contratos[0])

        expect(data).toMatchObject({
            cnpj: expect.any(String),
            contratos: expect.any(Array),
            descricaoStatusCliente: expect.any(String)
        })
    })

    it('Check zip code at services correios and get address:', async () => {
        let address = await SIGEP.consultaCEP('13469740')

        console.log( "consultaCEP", address )

        expect( address ).toMatchObject({
            cep: expect.any(String),
            end: expect.any(String)
        })
    })

    it('Service availability between the source zip code and destination zip code:', async () => {
        let disp = await SIGEP.verificaDisponibilidadeServico({
            cepDestino: '13469740',
            numeroServico: '10014'
        })

        console.log( "verificaDisponibilidadeServico", disp )

        expect( disp ).toMatchObject({
            status: expect.any(Boolean),
            message: expect.any(String)
        })
    })

    it('Check availability card post', async () => {
        let card = await SIGEP.verificarStatusCartaoPostagem()

        console.log( "verificarStatusCartaoPostagem", card)

        expect( card ).toMatchObject({
            status: expect.any(Boolean),
            situacao: "Normal"
        })
    })

    it('Generate PLP and tags', async () => {
        try{
            // solicita etiquetas carta registrada exemplo
            let tags = await SIGEP.solicitaEtiquetas({
                qtdEtiquetas: 6,
                idServico: '104359' //id os serviço, não codigo
            })

            //retorno em array de etiquetas sem digitos
            tags = tags.data

            //gera digitos das etiquetas
            let etqComDig = SIGEP.geraDigitoVerificadorEtiquetas( tags )

            let json = {
                correioslog: {
                    tipo_arquivo: 'Postagem',
                    versao_arquivo: 2.3,
                    plp: {
                        id_plp: '4402283132',
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
                        cpf_cnpj_remetente:"12345678901234",
                        ciencia_conteudo_proibido: 'S'
                    },
                    forma_pagamento: '5',
                    objeto_postal: [
                        {
                            numero_etiqueta: etqComDig[0], //etiquetas com digito verificador
                            sscc: '',
                            codigo_objeto_cliente:'',
                            codigo_servico_postagem:'10014', //aqui o codigo, não id do serviço
                            cubagem: '0,00',
                            peso:'2',
                            rt1:'',
                            rt2:'',
                            restricao_anac:'S',
                            destinatario:{
                                nome_destinatario: 'José teste da silva',
                                telefone_destinatario: '6232339644',
                                celular_destinatario:'62991239321',
                                email_destinatario:'js_teste@gmail.com',
                                logradouro_destinatario: 'Rua Humberto polo',
                                complemento_destinatario:'Sobrado',
                                numero_end_destinatario:'91'
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
                                valor_a_cobrar:''
                            },
                            servico_adicional:{
                                codigo_servico_adicional:  ["025"],
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
                            numero_etiqueta: etqComDig[1],
                            sscc: '',
                            codigo_objeto_cliente:'',
                            codigo_servico_postagem:'10014',
                            cubagem: '0,00',
                            peso:'2',
                            rt1:'',
                            rt2:'',
                            restricao_anac:'S',
                            destinatario:{
                                nome_destinatario: 'Maria do Teste',
                                telefone_destinatario: '6232339644',
                                celular_destinatario:'62991239321',
                                email_destinatario:'maria_teste@gmail.com',
                                logradouro_destinatario: 'Rua Humberto polo',
                                complemento_destinatario:'Sobrado',
                                numero_end_destinatario:'91'
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
                                codigo_servico_adicional: ["025"],
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
                        }
                    ]
                }
            }

            //remove sem digitos e espaços
            tags = tags.map((v) => {
                return v.replace(" ", "")
            })

            //gera PLP
            let idPLP = await SIGEP.fechaPlpVariosServicos({
                json,
                idPlpCliente: '1326780',
                //sem o digito verificador e sem espaço
                listaEtiquetas: tags
            })

            console.log( "PLP ID >", idPLP )

            return true
        }catch(e){
            console.error(e)

            return false
        }
    })
})
