module.exports = function () {
    let fs = require('fs');
    fs.readdir(process.argv[2], (e, l) => {
        if(e){
            console.log('error: ', e);
            return;
        } else {
            return l.filter((f) => {
                if(f.match('.' + process.argv[3])){
                    console.log(f.match(process.argv[3]).input);
                } else{
                    return;
                }
            })
        }

    })
}
