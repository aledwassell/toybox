const route = require('./routes');
module.exports = ((app, db) => {
    route(app, db);
});