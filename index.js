const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');
//config
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/',router);

const PORT = 8080;
app.listen(PORT,() => {
    console.log(`SERVER START ON PORT: ${PORT}`)
});