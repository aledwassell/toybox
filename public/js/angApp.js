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
            $scope.max = 100;
            $scope.slider = {
                value: 200,
                options: {
                    disabled: false,
                    floor: $scope.data[0],
                    ceil: $scope.data[2]
                    // translate: (v) => {
                    //     return `${Math.floor((v / $scope.data[2]) * 100)}%`;
                    // }
                }
            };

            $scope.$watch('slider.value', function () {
                console.log($scope.slider.value)
                $scope.data[2] = $scope.slider.value;
            })
            $scope.labels = ["Download Sales", "In-Store Sales", "Chuffing Cheap Sales"];
            $scope.data = [100, 300, 500];
            $scope.colors = [
                    '#67ff79',
                    '#e20b16',
                    '#67ff79'
                ];
            $scope.options = {
                cutoutPercentage: 50,
                rotation: -1 * Math.PI,
                circumference: Math.PI
            };




        }]);
})();