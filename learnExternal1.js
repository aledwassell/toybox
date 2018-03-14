module.exports = function (directory, ext, callback) {
    const fs = require('fs');
    const path = require('path');
    let files = [];
    fs.readdir(directory, (err, data) => {
        if(err){
            return callback(err, null);
        } else {
            data.forEach((f) => {
                // ext has .
                if(path.extname(f) === ext){
                    files.push(f);
                }

                // console.log(f);
                // if(){
                //     files.push(f);
                // } else {
                //     return;
                // }
            });
            callback(null, files);
        }
    });

}
