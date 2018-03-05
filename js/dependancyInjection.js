// var toBeInjected = function (say) {
//     setTimeout(function () {
//         console.info(say);
//     }, 1000);
// }

function mainFunc(aGlobalFunc, whatToSay) {
    var whatSay = whatToSay;
    aGlobalFunc(function () {
        console.info(whatSay);
    }, 1000);
}

mainFunc(setInterval, 'hello world')