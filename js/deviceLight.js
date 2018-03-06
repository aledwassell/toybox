(function () {
    'use strict'

    console.log('device light')
    document.addEventListener('devicelight', function (e) {
        console.log(e.value);
    })

})();