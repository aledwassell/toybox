const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const fs = require('fs');
let apiKey = JSON.parse(fs.readFileSync('config/FlickrApiKey.json', 'utf8'));
const Flickr = require('flickrapi'),
    flickrOptions = {
        api_key: apiKey.apiKey,
        secret: apiKey.secret
    };


module.exports = (app) => {
    // const getWeather = (location, res) => {
    //     request(
    //         `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`, (e, response, body) => {
    //         if(!e) {
    //             res.send(body);
    //         } else if (e){
    //             res.status(404).send(`There was an error in your request ${e} error`);
    //         }
    //     })
    // }
    //
    // app.get('/weather/:place', jsonParser, (req, res) => {
    //     if(!req.params.place){
    //         res.status(404).send(`You need to provide a location, ${req.params.place} is not valid.`);
    //         return false;
    //     }
    //     const location = req.params.place;
    //     getWeather(location, res);
    // })

    Flickr.authenticate(flickrOptions, function(error, flickr) {
        console.log(flickr);
        flickr.photos.search({
            user_id: flickr.options.user_id,
            page: 1,
            per_page: 500
        }, function(err, result) {
            // result is Flickr's response
        });
    });

}