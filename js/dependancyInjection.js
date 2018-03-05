var toBeInjected = function (say) {
    setTimeout(function (say) {
        console.info(say);
    }, 1000);
}

function mainFunc(toBeInjected, whatToSay) {
    var whatSay = whatToSay;
    toBeInjected(whatSay);
}

mainFunc('hello world')