const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

MongoClient.connect(db.url, (e, database) => {
    if(e) return console.log('there was an error: ', e)

    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log(`Server running at: ${port}/`);
    });
})