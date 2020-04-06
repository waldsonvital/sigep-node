//import module
const mod = require('../index')

//dodos da documentação dos correios
const SIGEP = mod.init({
    usuario: 'sigep',
    senha: 'n5f9t8',
    codAdministrativo: '17000190',
    idContrato: '9992157880',
    idCartaoPostagem: '0067599079',
    identificador: '34028316000103', //cnpj,
    cepOrigem: '70002-900'
})

describe('sigep tests', () => {
    it('Get client SIGEP:', async () => {
        let data = await SIGEP.buscaCliente()

        console.log( "buscaCliente", SIGEP.user.clienteData.contratos[0].cartoesPostagem[0].servicos )

        expect(data).toMatchObject({
            cnpj: expect.any(String),
            contratos: expect.any(Array),
            descricaoStatusCliente: expect.any(String)
        })
    })

    it('Check zip code at services correios and get address:', async () => {
        let address = await SIGEP.consultaCEP('13469740')

        //console.log( "consultaCEP", address )

        expect( address ).toMatchObject({
            cep: expect.any(String),
            end: expect.any(String)
        })
    })

    it('Service availability between the source zip code and destination zip code:', async () => {
        let disp = await SIGEP.verificaDisponibilidadeServico({
            cepDestino: '09720-010',
            numeroServico: '40878'
        })

        //console.log( "verificaDisponibilidadeServico", disp )

        expect( disp ).toMatchObject({
            status: expect.any(Boolean),
            message: expect.any(String)
        })
    })

    it('Check availability card post', async () => {
        let card = await SIGEP.verificarStatusCartaoPostagem()

        //console.log( "verificarStatusCartaoPostagem", card)

        expect( card ).toMatchObject({
            status: expect.any(Boolean),
            situacao: "Normal"
        })
    })

    it('Request tags list', async () => {
        let tags = await SIGEP.solicitaEtiquetas({
            qtdEtiquetas: 2,
            idServico: '124849'
        })

        console.log( "solicitaEtiquetas", tags )

        expect( tags ).toMatchObject({
            status: expect.any(Boolean),
            data: expect.any(Array)
        })
    })

    //it('Request time and price to shipping', async () => {
        //let calc = await SIGEP.calcPrecoPrazo({
            //nCdEmpresa: '',
            //sDsSenha: '',
            //nCdServico: '04014',
            //sCepOrigem: '30170-010',
            //sCepDestino: '04538-132',
            //nVlPeso: .01,
            //nCdFormato: 3,
            //nVlComprimento: 0,
            //nVlAltura: 5,
            //nVlLargura: 5,
            //nVlDiametro: 0,
            //sCdMaoPropria: 'N',
            //nVlValorDeclarado: 0,
            //sCdAvisoRecebimento: 'N'
        //})

        //expect(calc).toMatchObject({
            //Erro: '0',
        //})
    //})

    it('generate check digit to tags', async () => {
        //SZ804191112BR
        let digito = SIGEP.geraDigitoVerificadorEtiquetas([ 'SZ80600533 BR', 'SZ80600534 BR' ])
        console.log( digito )
    })

    it('generate PLP fot tags', async () => {
        // console.log("[ 'SZ80467822 BR', 'SZ80467823 BR' ]")
        //[ 'SZ806005334BR', 'SZ806005348BR' ]
        let json = {
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

        // [ 'SZ804678222BR', 'SZ804678236BR' ]
        //console.log( SIGEP.user.getUser().cl ienteData.contratos )
        let codigo = await SIGEP.fechaPlpVariosServicos({ json, idPlpCliente: '132678', listaEtiquetas: [ 'SZ80600533BR', 'SZ80600534BR' ] })
        console.log( codigo)
    })

    it('get JSON PLP correios', async () => {
        //await SIGEP.solicitaJsonPlp('43945087')
    })
})
