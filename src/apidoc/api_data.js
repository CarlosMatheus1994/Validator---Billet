define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/apidoc/main.js",
    "group": "/home/matheus/Área de Trabalho/Projetos/validade-Barcode/src/apidoc/main.js",
    "groupTitle": "/home/matheus/Área de Trabalho/Projetos/validade-Barcode/src/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "http://localhost:3333/",
    "title": "Validando a Linha Digitável",
    "description": "<p>Validando a Linha Digitável.</p>",
    "examples": [
      {
        "title": "Exemplo body requisição:",
        "content": "\n\n{\n   \"linhaDigitavel\" : 23792.37429 60001.028616 28014.360003 1 84480000004882\"\n}",
        "type": "json"
      }
    ],
    "group": "Linha_Digitável_Boleto",
    "parameter": {
      "fields": {
        "request body": [
          {
            "group": "request body",
            "type": "String",
            "optional": false,
            "field": "linhaDigitavel",
            "description": "<p>linha digitavel do boleto</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n\"linhaDigitavelIsValid\": true,\n\"valor\": \"R$ 48.82\",\n\"dataVencimento\": \"2020-11-23T20:54:59.000Z\",\n \"barcode\": \"23791844800000048822374260001028612801436000\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "linhaDigitavelIsValid",
            "description": "<p>A Linha do boleto é válida ?</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "valor",
            "description": "<p>Valor total do boleto.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "dataVencimento",
            "description": "<p>Data de vencimento do boleto.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "barcode",
            "description": "<p>Código de barras.</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: 400",
          "content": "HTTP/1.1 400 OK\n{\n \"message\": \"Bad Request,put a valid digitable Line!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes.js",
    "groupTitle": "Linha_Digitável_Boleto",
    "name": "GetHttpLocalhost3333"
  }
] });
