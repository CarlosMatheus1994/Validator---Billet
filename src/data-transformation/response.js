const response = (linhaDigitavel, valor, dataVencimento, barCode) => ({
    linhaDigitavelIsValid: linhaDigitavel,
    valor: `R$ ${valor}`,
    dataVencimento,
    barCode, 
})

module.exports = { 
    response
}