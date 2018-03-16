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
            let maxCalls = 150;
            let currentCalls = 140;
            let alarmValue = 50;
            $scope.slider1 = {
                value: 0,
                options: {
                    disabled: false,
                    floor: 0,
                    ceil: maxCalls,
                    translate: (v) => {
                        return `${v}%`;
                    }
                }
            };

            $scope.slider2 = {
                value: 0,
                options: {
                    disabled: false,
                    floor: 0,
                    ceil: maxCalls,
                    translate: (v) => {
                        return `${v}%`;
                    }
                }
            };

            $scope.data = [];


            function setGauge() {
                if(currentCalls < alarmValue){
                    $scope.data[0] = currentCalls;
                    $scope.data[1] = alarmValue - currentCalls;
                    $scope.data[2] = 0;
                    $scope.data[3] = maxCalls - alarmValue
                } else if(currentCalls > alarmValue){
                    $scope.data[0] = alarmValue;
                    $scope.data[1] = 0;
                    $scope.data[2] = currentCalls - alarmValue;
                    $scope.data[3] = maxCalls - currentCalls
                }
            }

            setInterval(() => {
                alarmValue = $scope.slider1.value;
                currentCalls = $scope.slider2.value
                setGauge()
            }, 300)

            // $scope.$watchCollection('slider1.value', function (newVal, oldVal) {
            //     alarmValue = $scope.slider1.value
            //     setGauge()
            // });

            $scope.labels = ["Download Sales", "In-Store Sales", "and some more data"];
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
                    fillColor: '#ffee00',
                    strokeColor: '#ffee00',
                    pointColor: '#ffee00',
                    pointStrokeColor: '#ffee00',
                    pointHighlightFill: '#ffee00',
                    pointHighlightStroke: '#ffee00',
                    pointBackgroundColor: '#ffee00',
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

        }]);
})();