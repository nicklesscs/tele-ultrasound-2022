'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());

// Create the regular HTTP request and response
app.get('/', function (req, res) {
	console.log('Get index');
	fs.createReadStream(__dirname + '/index.html').pipe(res);
});

module.exports = app;
