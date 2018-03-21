const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const db = require('./config/db');

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true})
const jsonParser = bodyParser.json();

app.get('queryBC/:code', (req, res) => {
    if(!req.params.code){
        res.status(500);
        res.send('Error on server, you need to rovide a valid barcode');
        console.log('There was an error, user did not provide barcode')
    }
    request.get({
        url: `api url&${req.params.code}&key=${}`
    }, (e, response, body) => {
        if(!e && response.status.code === 200) {
            res.send(body)
        }
    })
})



// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(db.url, (e, database) => {
    if(e) return console.log('there was an error: ', e)

    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log(`Server running at: ${port}/`);
    });
})