const express = require('express');
const env = require('dotenv');

const app = express();

const bodyParser = require('body-parser');
const { body } = require('express-validator');

app.use(bodyParser());

env.config();

const PORT = process.env.API_PORT;

require('./database/database');

app.listen(PORT, function(){
    console.log(`Server started listening at ${PORT}`);
});