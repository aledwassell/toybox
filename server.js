let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;


const hostname = '127.0.0.1';

const server = http.createServer();

server.on('request', (req, res) => {
    const {headers, method, url} = req;
    let body = [];
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    req.on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        console.log('body', body)
        body = Buffer.concat(body).toString();
    }).on('error', (e) => {
        console.log(`There was an error ${e}`);
    });

    res.statusCode = 200;

    // res.setHeader('Content-Type', 'application/json');
    res.writeHead(200, {'Content-Type': 'application/json'});

    const responseBody = {headers, method, url, body};
    // res.write(JSON.stringify(responseBody));
    // res.end();
    res.end(JSON.stringify(responseBody))
})

server.listen(port, () => {
    console.log(`Server running at: ${port}/`);
})
