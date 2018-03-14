// let newArr = process.argv.splice(2, process.argv.length).reduce(function(acc, curr){
//     return acc + Number(curr);
// }, 0);
// console.log(newArr);

// var fs = require('fs');
//
// let readFile = fs.readFileSync(process.argv[2]).toString().split('\n');
// console.log(readFile.length - 1);


// let fs = require('fs');
//
// let readFile = fs.readFile(process.argv[2], 'utf8', (err, data) => {
//     if(err){
//         console.log('There was an error', err);
//     } else {
//         console.log(data.toString().split('\n').length - 1);
//     }
// });


// let fs = require('fs');
// fs.readdir(process.argv[2], (e, l) => {
//     if(e){
//         console.log('There was an error', e);
//     } else {
//         return l.filter((f) => {
//             if(f.match('.' + process.argv[3])){
//                 console.log(f.match(process.argv[3]).input);
//             } else{
//                 return;
//             }
//         })
//     }
// });

// const myModule = require('./learnExternal1');
// const path = require('path');
// myModule(process.argv[2], process.argv[3], (err, data) => {
//     if(err){
//         console.log('there was an error', err);
//     } else {
//         data.forEach((i) => {
//             console.log(i)
//         })
//
//     }
// });

const http = require('http');
http.get(process.argv[2], (res) => {
    const {statusCode} = res;
    const contentType = res.headers['content-type'];

    if(statusCode !== 200){
        console.error('There was an error, 200');
        return false;
    }

    res.setEncoding('utf8');

    res.on('data', (data) => {
        console.log(data)
    }).on('end', () => {

    })
}).on('error', (e) => {
    console.log(`There was an error: ${e.message}`);
});







