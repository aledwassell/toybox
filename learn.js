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

let fs = require('fs');
const myFunc = require('./learnExternal1');

myFunc(process.argv[2], process.argv[3], (e) => {
    console.log(e)
});
