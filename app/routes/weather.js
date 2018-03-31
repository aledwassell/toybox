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
        const location = req.params.location;
        request.get({
            url: `api url&${req.params.place}`
        }, (e, response, body) => {
            if(!e && response.status.code === 200) {
                res.send(body)
            } else if (e){
                res.status(404).send(`There was an error in your request ${e}`);
            }
        })
    })

}