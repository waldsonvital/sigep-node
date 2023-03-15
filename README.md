# SIGEP-JS

## Objetivo
Uma camada para facilitar as chamadas para o sigep em NODE e geração pdf das etiquetas, os metodos seguem a documentação dos correios e suas regras.

## Instalação

```
npm install sigep-js
```

```
yarn add sigep-js
```

## Metodos

iniciando os serviços adicione as informações do contrato no init para ter acessos aos serviços

```javascript
const SIGEP = require("sigep-js").init({
    usuario,
    senha,
    codAdministrativo,
    idContrato,
    idCartaoPostagem,
    identificador, //cnpj
    cepOrigem
})
```

```javascript
await SIGEP.verificaDisponibilidadeServico({
    cepDestino,
    numeroServico,
    cepOrigem // opcional
});

await SIGEP.consultaCEP( cep );

/**
 * Solicita as etiquetas sem digito verificador.
 */
await SIGEP.solicitaEtiquetas({
    qtdEtiquetas
    idServico
});

//gera as etiquetas com digitos verificados
SIGEP.geraDigitoVerificadorEtiquetas([ 'SZ80600533 BR', 'SZ80600534 BR' ]);

/**
 * EX: na pasta __tests__/sigep.jest.js
 * ou yarn test
 */
SIGEP.fechaPlpVariosServicos({
    json,
    idPlpCliente: '1326780', //id interno do cliente
    //sem o digito verificador e sem espaço e na sequencia dos objetos postais
    listaEtiquetas: [ 'SZ80600533BR', 'SZ80600534BR' ]
})

//modelos JSON para ajudar na montagem do PLP - recomendado ler a documentaçao dos Correios
let plp = SIGEP.PLPModel.plp
let objPostal = SIGEP.PLPModel.objetoPostal

/**
 * A lista de etiquetas precisa estar na ordem do adicionado no JSON PLP
 * ex: modelo exemplo em __tests__/etiquetas.jest.js
 */
await SIGEP.solicitaJsonPlp({
    jsonPLP,
    idPlpCliente,
    listaEtiquetas //array, [ 'SZ80600533BR', 'SZ80600534BR' ]
})

await SIGEP.calcPrecoPrazo({
    nCdEmpresa, //não obrigatório
    sDsSenha, //não obrigatório
    nCdServico,
    sCepOrigem,
    sCepDestino,
    nVlPeso, //Decimal ex: 1 = 1kg
    nCdFormato, //1 – Formato caixa/pacote, 2 – Formato rolo/prisma, 3 – Envelope
    nVlComprimento, //Decimal ex: 1 = 1cm
    nVlAltura, //Decimal ex: 1 = 1cm
    nVlLargura //Decimal ex: 1 = 1cm
    nVlDiametro, //Decimal ex: 1 = 1cm
    sCdMaoPropria, //"S" = sim, "N" = não
    nVlValorDeclarado //Decimal ex: 1 = R$1,00
    sCdAvisoRecebimento //"S" = sim, "N" = não
});

await SIGEP.buscaCliente();

await SIGEP.verificarStatusCartaoPostagem( idCartaoPostagem /*oprcional*/ );

await SIGEP.bloquearObjeto(
    etiqueta,
    idPLP
);

//BREVE
SIGEP.rastrearObjeto();

//BREVE
SIGEP.cancelarObjeto();

```

# IMPRESSÃO

Por enquanto os pdf das etiquetas são feitas com [puppeteer](https://github.com/puppeteer/puppeteer/) e html, nesse momento tem apenas a etiqueta pequena outro modelos em breve.

```javascript
//EX: __tests__/etiquetas.jest.js ou yarn test
const jsonPLP = {} //o objeto JSON do plp enviado para o SIGEP

const path = require('path')
const dir = path.dirname(__dirname)
const SIGEPPDF = require('sigep-js').pdfPLP( '44022831', jsonPLP, dir + '/__tests__/tmp/', 'teste_sigep'  )


await SIGEPPDF.tagsToPDF( dir + '/__tests__/tmp/arquivo.pdf' )
await SIGEPPDF.voucherToPDF( dir + '/__tests__/tmp/arquivo_voucher.pdf', '20/01/2020' )
```