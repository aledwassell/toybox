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
            $scope.$watch('slider.value', function () {
                console.log($scope.slider.value);
                $scope.data[2] = $scope.slider.value;
            });
            $scope.fill = '';
            $scope.$on('chart-create', (e, chart) => {
                console.log(e, chart)
                var ctx = chart.chart.chart.ctx;
                var fillPattern = ctx.createLinearGradient(0,0,200,0);
                fillPattern.addColorStop(0, 'rgba(0,255,0, 1)');
                fillPattern.addColorStop(1, 'rgba(255,0,0, 1)');
                ctx.fillStyle = fillPattern;

                $scope.fill = fillPattern;

                console.log(fillPattern)
            });


            $scope.labels = ["Download Sales", "In-Store Sales", "gradient"];
            $scope.data = [20, 40, 70, 10];
            $scope.colors = [
                {
                    backgroundColor: $scope.fill,
                    pointBackgroundColor: $scope.fill
                },
                {
                    backgroundColor: 'rgba(255,255,0, 1)',
                    pointBackgroundColor: 'rgba(255,255,0, 1)'
                },
                {
                    backgroundColor: 'rgba(255,0,255, 1)',
                    pointBackgroundColor: 'rgba(255,0,255, 1)'
                },
            ];

            $scope.options = {
                cutoutPercentage: 50,
                rotation: -1 * Math.PI,
                circumference: Math.PI
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