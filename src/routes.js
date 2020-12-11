const routes = require('express').Router();

const validateBarCodeController = require('./controllers/validateBarCodeController');

routes.get('/', validateBarCodeController.validadeBarCode);

module.exports = routes;

/**
* @api {get} http://localhost:3333/ Validando a Linha Digitável
* @apiDescription Validando a Linha Digitável.
*
* @apiExample Exemplo body requisição:
*
*
*{
*    "linhaDigitavel" : 23792.37429 60001.028616 28014.360003 1 84480000004882"
*}
*
*
*
*
* @apiGroup Linha Digitável Boleto
* @apiParam (request body) {String} linhaDigitavel linha digitavel do boleto
*
* @apiSuccessExample {json} Success-Response:
*
*{
* "linhaDigitavelIsValid": true,
* "valor": "R$ 48.82",
* "dataVencimento": "2020-11-23T20:54:59.000Z",
*  "barcode": "23791844800000048822374260001028612801436000"
*}
*
* @apiSuccess               {boolean}              linhaDigitavelIsValid           A Linha do boleto é válida ?
* @apiSuccess               {string}               valor                           Valor total do boleto.
* @apiSuccess               {string}               dataVencimento                  Data de vencimento do boleto.
* @apiSuccess               {string}               barcode                         Código de barras.
*
* @apiErrorExample {json} Error-Response: 400
* HTTP/1.1 400 OK
* {
*  "message": "Bad Request,put a valid digitable Line!"
*}
*
*/