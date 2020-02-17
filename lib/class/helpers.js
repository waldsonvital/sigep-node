class Helper {
    clearCEP = (data) => {
        let regNDig = /\D/g
        let regText = /cep/g

        if(typeof data === 'object'){
            Object.keys(data).map(( key ) => {
                if(typeof data[key] === 'string'){
                    if(regText.test( key )){
                        data[key] = data[key].replace(regNDig, '')
                    }
                }
            })

        }else{
            data = data.replace(regNDig, '')
        }

        return data
    }

    format = ( code, format ) => {
        if( format === 'rastreio' ){
            let codeArr = code.replace(/^(\D{2})(\d{3})(\d{3})(\d{3})(\D{2}).*/gm, '$1 $2 $3 $4 $5')

            return codeArr
        }else if( format === 'cep' ){
            let cepArr = code.replace(/(\d{5})(\d{3})/gm, '$1-$2')

            return cepArr
        }
    }
}

module.exports = Helper
