const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');

module.exports = (app) => {

    app.get('/api/:id', (req, res) => {
        const gotDat = getElementById(req.params.id, dat);
        if(gotDat !== undefined){
            res.send(gotDat);
        } else {
            res.status(404).send(`No records with id ${req.params.id}`)
        }

    })

    app.get('/weather/:place', (req, res) => {
        if(!req.params.place){
            res.status(404).send(`You need to provide a location, ${req.params.place} is not valid.`);
            return false;
        }
        const apiKey = '6bd81b03a64f7ae2cb9240d3271279aa';
        const location = req.params.place;
        console.log(location);

        request.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}` , (e, res, body) => {
            console.log(e, res, body)
            if(!e && res.status === 200) {
                res.send(body)
                console.log(body)
            } else if (e){
                res.status(404).send(`There was an error in your request ${e}`);
            }
        })
    })

}