let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;
var request = require("request")
let content = fs.readFileSync('public/assets/data.json');

const mongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const routes = require('./index')(app, {});

app.listen(port, () => {
    console.log(`Server running at: ${port}/`);
});