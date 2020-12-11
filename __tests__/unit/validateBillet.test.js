const request = require('supertest');
const app = require('../../src/app');

describe('Validando Linha Digitavel', () => {
    it('deve receber um código de barras e validar', async () => {

        const response = await request(app)
            .get('/')
            .send({
                linhaDigitavel: "23792.37429 60001.028616 28014.360003 1 84480000004882"
            })

        expect(response.status).toBe(200)
        expect(response.body.linhaDigitavelIsValid).toBe(true)
        console.log(response.body.linhaDigitavelIsValid)
    });

    
})