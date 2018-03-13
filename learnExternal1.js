module.exports = function (directory, ext, callback) {
    let fs = require('fs');
    fs.readdir(directory, (e, l) => {
        if(e){
            return callback(e);
        } else {
            return l.filter((f) => {
                if(f.match('.' + ext)){
                    callback(null, f.match(ext).input);
                } else{
                    return;
                }
            })
        }

    })
}
