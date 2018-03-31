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

const dat = [
    {id: 1, name: 'Clive', address:'26, milton terrace', age: 80, food: 'pizza'},
    {id: 2, name: 'Dave', address:'26, milton terrace', age: 80, food: 'pizza'},
    {id: 3, name: 'Peter', address:'26, milton terrace', age: 80, food: 'pizza'},
    {id: 4, name: 'Pat', address:'26, milton terrace', age: 80, food: 'pizza'},
    {id: 5, name: 'Carl', address:'26, milton terrace', age: 80, food: 'pizza'}
];

const getElementById = (id, arr) => {
    let returnedVal;
    for(let i = 0; i < arr.length; i++) {
        if(id == arr[i].id){
            returnedVal = arr[i];
        }
    }
    console.log(returnedVal)
    if(returnedVal){
        return returnedVal
    } else {
        return undefined
    }
}

app.get('/api/:id', (req, res) => {
    const gotDat = getElementById(req.params.id, dat);
    if(gotDat !== undefined){
        res.send(gotDat);
    } else {
        res.status(404).send(`No records with id ${req.params.id}`)
    }

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