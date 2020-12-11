const clearMask = require('../utils/clearMask');
const moment = require('moment-timezone');
const modulo10 = require('../utils/modulos10');
const modulo11 = require('../utils/modulo11');
const constants = require('../responses/constants');
const errors = require('../responses/errors');
const response = require('../data-transformation/response');

module.exports = {
    async validadeBarCode(req, res) {

        // Linha digitavel do boleto, para requisição.
        const { linhaDigitavel } = req.body

        // pega linha digitavel enviada no parametro e tira caracteres especiais
        const codigo = clearMask(linhaDigitavel)
        // ex: 23792.37429 60001.028616 28014.360003 1 84480000004882

        // verifica se o código é linha digitavel ou código de barras
        const tipoCodigo = identificarTipoCodigo(codigo)

        if (tipoCodigo == constants.tipoCodigo.tamanhoIncorreto) {
            return res.json({
                error: errors.invalidBarCode.invalidLength
            })
        }

        let valorBoleto = '';
        let valorFinal;
        valorBoleto = codigo.substr(37);
        valorFinal = valorBoleto.substr(0, 8) + '.' + valorBoleto.substr(8, 2);
        valorFinal = Number(valorFinal).toString();

        const data = dataLinhaCodigo(codigo)
        const barcode = linhaDigitavelToBarCode(codigo);

        const blocos = [
            {
                num: linhaDigitavel.substring(0, 9),
                DV: linhaDigitavel.substring(9, 10),
            },
            {
                num: linhaDigitavel.substring(10, 20),
                DV: linhaDigitavel.substring(20, 21),
            },
            {
                num: linhaDigitavel.substring(21, 31),
                DV: linhaDigitavel.substring(31, 32),
            },
        ];

        const validarBlocos = false;

        const validBlocos = validarBlocos ? blocos.every(e => modulo10(e.num) === Number(e.DV)) : true;


        const validDVModulo11 = barcode

        const DV = barcode[4];
        const bloco = barcode.substring(0, 4) + barcode.substring(5);
        const modulo11IsValid = modulo11(bloco) === Number(DV);


        let dvLinhaDigitavel = false;

        if (modulo11IsValid == validBlocos) {
            dvLinhaDigitavel = true
        }

        res.status(200).json(response.response(dvLinhaDigitavel, valorFinal, data, barcode))

    }
}

function identificarTipoCodigo(codigo) {

    if (typeof codigo !== 'string') throw new TypeError(errors.invalidBarCode.invalidType);

    if (codigo.length == 44) {
        return constants.tipoCodigo.codigoDeBarras
    } else if (codigo.length == 46 || codigo.length == 47 || codigo.length == 48) {
        return constants.tipoCodigo.linhaDigitavel
    } else {
        return constants.tipoCodigo.tamanhoIncorreto;
    }
}


function dataLinhaCodigo(codigo) {

    codigo = codigo.replace(/[^0-9]/g, '');

    let fatorData = '';
   
    let dataBoleto = moment.tz("1997-10-07 20:54:59.000Z", "UTC");
    fatorData = codigo.substr(33, 4);
    const date = new Date()

    if (date > moment.tz("2025-02-21 23:59:59.000Z", "UTC")) {
        dataBoleto = moment.tz("2025-02-22 00:00:00.000Z", "UTC")
        dataBoleto.add(Number(fatorData), 'days');
        return dataBoleto.toDate();
    }

    dataBoleto.add(Number(fatorData), 'days');
    return dataBoleto.toDate();
}


function linhaDigitavelToBarCode(codigo) {
    codigo = codigo.replace(/[^0-9]/g, '');

    let resultado = '';

    resultado =
        codigo.substr(0, 4) +
        codigo.substr(32, 15) +
        codigo.substr(4, 5) +
        codigo.substr(10, 10) +
        codigo.substr(21, 10);

    return resultado;
}