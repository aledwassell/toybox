let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;
let body = [];

const hostname = '127.0.0.1';

const server = http.createServer();

server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    req.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        console.log(body)
    })
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
