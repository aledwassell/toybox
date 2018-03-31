const route = require('./routes');
const products = require('./products');
const scanner = require('./scanner');
const weather = require('./weather')
module.exports = ((app, db) => {
    route(app, db);
    products(app, db);
    scanner(app, db);
    weather(app);
});