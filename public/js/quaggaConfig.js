(function(){
    'use strict';
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        // safely access `navigator.mediaDevices.getUserMedia`
        console.log('browser be cool')
        let app = {

            init: function () {
                Quagga.init(this.state, function (err) {
                    if (err) {
                        console.log('You got an error: ', err);
                        return;
                    }
                    console.log("Initialization finished. Ready to start");
                    Quagga.start();
                })
            },
            state: {
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    constraints: {
                        width: {min: 640},
                        height: {min: 480},
                        facingMode: "environment",
                        aspectRatio: {min: 1, max: 2}
                    },
                    target: document.querySelector('#quaggaTarget')    // Or '#yourElement' (optional)
                },
                decoder: {
                    readers: ["code_128_reader"]
                }
            }
        }
        app.init()
    }
}());


