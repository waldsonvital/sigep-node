module.exports.clearCEP = (data) => {
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
