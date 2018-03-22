(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'rzModule', 'chart.js', 'angularjs-gauge'])
        .factory('data', function ($resource) {
            return $resource('/notes', {}, {
                post: {
                    method: 'POST',
                    isArray: false
                },
                get: {
                    method: 'GET',
                    isArray: false,
                },
                delete: {
                    method: 'DELETE',
                    isArray: false,
                    id: '@id'
                }
            })
        })
        .factory('barcodeQuery', ($resource) => {
            return $resource('/queryBC/', {code:'@code'}, {
                get: {
                    method: 'GET',
                    isArray: false,
                    code: '@code'
                }
            })
        })
        .controller('dataController', ['$scope', 'data', function($scope, data){
            $scope.dataService = data;
            $scope.sendModel = {};
            $scope.deleteModel = {};

            $scope.delete = function () {
                console.log($scope.deleteModel.id)
                $scope.dataService.delete($scope.deleteModel.id);
            }

            $scope.get = function () {
                $scope.dataService.get({params: 'cheese'});
            }

            $scope.send = function () {
                $scope.dataService.post($scope.sendModel);
            }
        }])

        .controller('scannerController', ['$scope', 'barcodeQuery', function($scope, barcodeQuery){
            $scope.factory = barcodeQuery;
            if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
                // safely access `navigator.mediaDevices.getUserMedia`
                console.log('browser be cool')
                let scanner = {

                    init: function () {
                        Quagga.init(this.state, function (err) {
                            if (err) {
                                console.log('You got an error: ', err);
                                return;
                            }
                            console.log("Initialization finished. Ready to start");
                            Quagga.start();
                        }),
                        Quagga.onDetected((data) => {
                            console.log(data)
                            $scope.factory.get(data.codeResult.code)

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

                };
                scanner.init()
            }

        }])
        .controller('gaugeController', ['$scope', function ($scope) {
            // $scope.gauge = {
            //     thresholds:{
            //         '0': {color: 'green'},
            //         '40': {color: 'orange'},
            //         '75': {color: 'red'}
            //     },
            //     value: setInterval(() => {
            //             return Math.floor(Math.random() * Math.floor(100))
            //         }, 500)
            // }
            // $scope.slider = {
            //     value: 0,
            //     options: {
            //         disabled: false,
            //         floor: 0,
            //         ceil: 100,
            //         translate: (v) => {
            //             return `${v}%`;
            //         }
            //     }
            // };
        }]);
})();