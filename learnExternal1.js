module.exports = function (directory, ext, callback) {
    const fs = require('fs');
    const path = require('path');
    fs.readdir(directory, (err, data) => {
        if(err){
            return callback(err, null);
        } else {
            data = data.filter((f) => {
                return path.extname(f) === `.${ext}`
            });
            callback(null, data);
        }
    });

}
