let http = require('http');
let fs = require('fs');
let path = require('path');
let port = process.env.PORT = 3000;


const server = http.createServer();

server.on('request', (req, res) => {
    req.on('error', (e) => {
        console.log(e);
        res.statusCode = 400;
        res.end();
    });
    res.on('error', (e) => {
        console.log(e)
    })
    if(req.method === 'POST' && req.url === '/echo'){
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            res.end(body);
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
})

// server.on('request', (req, res) => {
//     const {headers, method, url} = req;
//     let body = [];
//     req.on('data', (chunk) => {
//         body.push(chunk)
//     }).on('end', () => {
//         body = Buffer.concat(body).toString();
//         res.end(body)
//     }).on('error', (e) => {
//         console.log(`There was an error ${e}`);
//     });
//
//     res.statusCode = 200;
//
//     // res.setHeader('Content-Type', 'application/json');
//     // res.writeHead(200, {'Content-Type': 'application/json'});
//
//     const responseBody = {headers, method, url, body};
//     // res.write(JSON.stringify(responseBody));
//     // res.end();
//     // res.end(JSON.stringify(responseBody));
//
// })

server.listen(port, () => {
    console.log(`Server running at: ${port}/`);
})
