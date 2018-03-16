(function () {
    'use strict';
    let canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    let ctx = canvas.getContext("2d");
    let gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(1, 'red');
    let toybox_app = angular.module('toybox_app', ['ngResource', 'rzModule', 'chart.js'])
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
            $scope.$watch('slider.value', function () {
                console.log($scope.slider.value);
                $scope.data[2] = $scope.slider.value;
            });





            //$scope.fill = '';
            //let fill;gradient$scope.$on('chart-create', (e, chart) => {
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


            $scope.labels = ["Download Sales", "In-Store Sales", "gradient"];
            $scope.data = [20, 40, 70, 10];

            $scope.colors = [
                {
                    fillColor: gradient,
                    strokeColor: gradient,
                    pointColor: gradient,
                    pointStrokeColor: gradient,
                    pointHighlightFill: gradient,
                    pointHighlightStroke: gradient,
                    pointBackgroundColor: gradient
                },
                {
                    fillColor: gradient,
                    strokeColor: gradient,
                    pointColor: gradient,
                    pointStrokeColor: gradient,
                    pointHighlightFill: gradient,
                    pointHighlightStroke: gradient,
                    pointBackgroundColor: gradient
                },
                {
                    fillColor: gradient,
                    strokeColor: gradient,
                    pointColor: gradient,
                    pointStrokeColor: gradient,
                    pointHighlightFill: gradient,
                    pointHighlightStroke: gradient,
                    pointBackgroundColor: gradient
                },
                {
                    fillColor: gradient,
                    strokeColor: gradient,
                    pointColor: gradient,
                    pointStrokeColor: gradient,
                    pointHighlightFill: gradient,
                    pointHighlightStroke: gradient,
                    pointBackgroundColor: gradient
                }
            ];

            $scope.options = {
                cutoutPercentage: 50,
                rotation: -1 * Math.PI,
                circumference: Math.PI,
                animation: false
            };

            $scope.slider = {
                value: 20,
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