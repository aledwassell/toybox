const express = require('express');
var app = express();

var port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
    console.log('app running on port: ' + port)
});