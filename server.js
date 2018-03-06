const express = require('express');
var app = express();

var port = process.env.PORT || 8888;

app.use(express.static('.'));

app.listen(port, function () {
    console.log('app running on port 8888')
})