let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;
var request = require("request")
let content = fs.readFileSync('public/assets/data.json');

let router = require('./api');

const server = http.createServer();

server.on('request', (req, res) => {
    req.setRequestHeader({'Content-Type' : 'text/html'})
        .
    console.log(req)
});

server.listen(port, () => {
    console.log(`Server running at: ${port}/`);
});
