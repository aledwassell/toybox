if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
    // safely access `navigator.mediaDevices.getUserMedia`
    console.log('browser be cool')
    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            constraints: {
                width: {min: 640},
                height: {min: 480},
                facingMode: "environment",
                aspectRatio: {min: 1, max: 2}
            },rs
            target: document.querySelector('#quaggaTarget')    // Or '#yourElement' (optional)
        },
        decoder : {
            readers : ["code_128_reader"]
        }
    }, function(err) {
        if (err) {
            console.log('You got an error: ', err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    })
}

