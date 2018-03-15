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
        .controller("chartsCtrl", function ($scope) {
            $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
            $scope.options = {

            }
        });
})();