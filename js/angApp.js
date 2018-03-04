(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource'])
        .factory('getData', function ($resource) {
            return $resource('https://jsonplaceholder.typicode.com/posts/1', {}, {
                get: {
                    method: 'GET'
                }
            })
        })
        .service('getDataService', ['$http', 'getData', function ($http, getData) {
            var gotData = getData;
            this.ding = function(){
                return gotData.get();
            }
        }])
    .controller('testController', ['$scope', 'getDataService', function ($scope, getDataService) {
        var getDataService = getDataService.ding();
        $scope.test = getDataService;
        console.log($scope.test)
    }])
})();