const route = require('./routes');
const products = require('./products');
module.exports = ((app, db) => {
    route(app, db);
    products(app, db);
});