const app = require('./app');
const express = require('express')

app.use('/validatorBar/doc', express.static('src/apidoc'))
app.listen(3333)
