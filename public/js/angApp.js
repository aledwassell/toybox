(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource', 'rzModule', 'chart.js'])
        .factory('getData', function ($resource) {
            return $resource('https://jsonplaceholder.typicode.com/posts/1', {}, {
                get: {
                    method: 'GET'
                }
            })
        })
        .factory('getGiffs', function($resource){
            return $resource('https://api.giphy.com/v1/gifs/search?api_key=RY20njLFYdgoLq572vuNe1QJEzs7qoVS &q= &limit=25&offset=0&rating=G&lang=en', {}, {
                get: {
                    method: 'GET',
                    url: 'https://api.giphy.com/v1/gifs/search?api_key=RY20njLFYdgoLq572vuNe1QJEzs7qoVS&limit=25&offset=0&rating=G&lang=en&q=:query',
                    query: '@query'
                }
            })
        })
        .service('getDataService', ['$http', 'getData', 'getGiffs', function ($http, getData, getGiffs) {
            var gotData = getData,
                getGiffs = getGiffs;
            this.gotData = function(){
                return gotData.get();
            }
            this.getGiffs = function(query){
                return getGiffs.get({query: query});
            }
        }])
        .controller('testController', ['$scope', 'getDataService', function ($scope, getDataService) {
            var getDataService = getDataService.gotData();
            $scope.test = getDataService;
        }])
        .controller('giffController', ['$scope', 'getDataService', function($scope, getDataService){
            $scope.getDataService = getDataService;
            $scope.giffsPromise = getDataService.getGiffs('cows')
                .$promise.then(function(giff){$scope.giffs = giff})
                .then(function(){
                    console.log($scope.giffs.data)
                })

        }])
        .controller('test', ['$scope', function ($scope) {
            console.log($scope);
            $scope.test = 'test';
        }])







        .controller("chartsCtrl", ['$scope', function ($scope) {
            let randN = getRandomInt(20, 100);
            $scope.data = [randN, 40, 0, 0];
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            }

            setInterval(function () {
                randN = getRandomInt(20, 100);
            }, 500);

            $scope.data = [randN, 40, 0, 0];

            function changeDat (sliderVal) {
                $scope.data[3] = sliderVal;
            }
            $scope.$watch('slider.value', function () {
                console.log($scope.slider.value);
                // $scope.data[3] = $scope.slider.value;
                changeDat($scope.slider.value)
            });

            // let canvas = document.createElement('canvas');
            // canvas.width = 300;
            // canvas.height = 300;
            // let ctx01 = canvas.getContext("2d");
            // let gradient = ctx01.createLinearGradient(0, 0, 0, 300);
            // gradient.addColorStop(0, 'green');
            // gradient.addColorStop(1, 'red');
            //
            // let fill = '';
            // $scope.$on('chart-create', (e, chart) => {
            //     console.log('chart', chart);
            //     var ctx = chart.chart.ctx;
            //     var fillPattern = ctx.createLinearGradient(0,0,200,0);
            //     fillPattern.addColorStop(0, 'rgba(0,255,0, 1)');
            //     fillPattern.addColorStop(1, 'rgba(255,0,0, 1)');
            //     ctx.fillStyle = fillPattern;
            //     console.log('chart', chart);
            //     console.log('ctx', ctx)
            //     fill = fillPattern;
            //     // $scope.data.datasets.backgroundColor = fillPattern;
            //     console.log(fillPattern)
            // });


            $scope.labels = ["Download Sales", "In-Store Sales", "more data", "and some more data"];
            // $scope.data = [20, 40, 0, 0];

            $scope.colors = [
                {
                    fillColor: '#00ffff',
                    strokeColor: '#00ffff',
                    pointColor: '#00ffff',
                    pointStrokeColor: '#00ffff',
                    pointHighlightFill: '#00ffff',
                    pointHighlightStroke: '#00ffff',
                    pointBackgroundColor: '#00ffff'
                },
                {
                    fillColor: '#00ff00',
                    strokeColor: '#00ff00',
                    pointColor: '#00ff00',
                    pointStrokeColor: '#00ff00',
                    pointHighlightFill: '#00ff00',
                    pointHighlightStroke: '#00ff00',
                    pointBackgroundColor: '#00ff00'
                },
                {
                    fillColor: '#ffff00',
                    strokeColor: '#ffff00',
                    pointColor: '#ffff00',
                    pointStrokeColor: '#ffff00',
                    pointHighlightFill: '#ffff00',
                    pointHighlightStroke: '#ffff00',
                    pointBackgroundColor: '#ffff00'
                },
                {
                    fillColor: '#ff0000',
                    strokeColor: '#ff0000',
                    pointColor: '#ff0000',
                    pointStrokeColor: '#ff0000',
                    pointHighlightFill: '#ff0000',
                    pointHighlightStroke: '#ff0000',
                    pointBackgroundColor: '#ff0000'
                },

            ];

            $scope.options = {
                cutoutPercentage: 50,
                rotation: -1 * Math.PI,
                circumference: Math.PI,
                animation: false
            };

            $scope.slider = {
                value: 0,
                options: {
                    disabled: false,
                    floor: 0,
                    ceil: 100,
                    translate: (v) => {
                        return `${Math.floor((v / 100) * 100)}%`;
                    }
                }
            };

        }]);
})();