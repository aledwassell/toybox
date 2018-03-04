(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource'])
        .factory('getData', function ($resource) {
            return $resource('https://jsonplaceholder.typicode.com/posts', {}, {
                get: {
                    method: 'GET',
                    url: 'https://jsonplaceholder.typicode.com/posts/:id',
                    isArray: false,
                    id: '1'
                }
            })
        })
        .service('getDataService', ['$http', 'getData', function ($http, getData) {
            var gotData = getData
            this.ding = function(){
                console.log(gotData)
                return gotData.get()
            }
        }])
    .controller('testController', ['$scope', 'getDataService', function ($scope, getDataService) {
        var getDataService = getDataService;
        $scope.gotDataFromServe = getDataService.ding();
        $scope.test = $scope.gotDataFromServe;

        console.log($scope.test)

    }])
})();