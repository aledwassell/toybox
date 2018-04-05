(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'ngRoute', 'rzModule', 'chart.js', 'angularjs-gauge'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: "main",
                    templateUrl : "views/main.htm"
                })
                .when("/weather", {
                    controller: "weatherController",
                    templateUrl : "views/weather.htm"
                })
                .when("/photos", {
                    controller: "photos",
                    templateUrl : "views/photos.htm"
                })
        })
        .factory('data', function ($resource) {
            return $resource('/notes', {}, {
                post: {
                    method: 'POST',
                    isArray: false,
                    id: '@id'
                },
                get: {
                    method: 'GET',
                    isArray: false,
                },
                delete: {
                    method: 'DELETE',
                    isArray: false,
                    id: '@id'
                },
                getAll: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .factory('barcodeQuery', ($resource) => {
            return $resource('/querybc/', {}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .factory('weatherFactory', ($resource) => {
            return $resource('/weather/:place', {}, {
                get: {
                    method: 'GET',
                    isArray: false,
                    params: '@place'
                }
            })
        })
        .factory('flickrPhotos', ($resource) => {
            return $resource('/photos', {}, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            })
        })
        .service('PhotoService', ['flickrPhotos', function(flickrPhotos){
            let photoUrls = [];
            this.loadPhotoUrls = function(){
                return new Promise(
                    function (resolve, reject) {
                        flickrPhotos.get({}, function (results) {
                            console.log(results)
                            if (resolve && typeof resolve === 'function') {
                                resolve(photoUrls);
                            }

                        }, function (resp) {
                            if (reject && typeof reject === 'function') {
                                reject(resp);
                            }
                        });
                    }
                )
            };
            this.loadPhotoUrls();
            this.getPhotoUrls = function(){
                return photoUrls;
            }
        }])
        .controller('navigationCtrl', ['$scope', function ($scope) {
            $scope.links = [
                {url:'/', name: 'Home'},
                {url:'#!/weather', name: 'Weather'},
                {url:'#!/photos', name: 'Photos'}
            ]
        }])
        .controller('weatherController', ['$scope', 'weatherFactory', function ($scope, weatherFactory) {
            $scope.service = weatherFactory;
            $scope.setLoc = '';
            $scope.clear = function () {
                $scope.setLoc = '';
            }
            $scope.getWeather = () => {
                $scope.weather = $scope.service.get({place: `${$scope.setLoc}`});
            }


        }])
        .controller('dataController', ['$scope', 'data', function($scope, data){
            $scope.dataService = data;
            $scope.sendModel = {};
            $scope.deleteModel = {};

            $scope.delete = function () {
                console.log($scope.deleteModel.id)
                $scope.dataService.delete($scope.deleteModel.id);
            }

            $scope.get = function () {
                $scope.dataService.get($scope.sendModel.id);
            }

            $scope.send = function () {
                $scope.dataService.post($scope.sendModel);
            }


        }])
        .controller('photos', ['$scope', 'PhotoService', function ($scope, PhotoService) {
            $scope.fots = PhotoService.getPhotoUrls();
            console.log($scope.fots);
            // $scope.photoDat = $scope.rawData.photos.photo.map((cur, index, array, thisArg) => {
            //     cur.url = `https://farm${cur.farm}.staticflickr.com/${cur.server}/${cur.id}_${cur.secret}.jpg`
            // });
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
                            $scope.factory.get({code: data.codeResult.code})
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
                            readers: [{
                                format: "ean_reader",
                                config: {
                                    supplements: [
                                        'ean_5_reader', 'ean_2_reader'
                                    ]
                                }
                            }]
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