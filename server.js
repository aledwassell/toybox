let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;

const hostname = '127.0.0.1';

const server = http.createServer();

server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    console.log(req.url);
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
