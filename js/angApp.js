(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', [])
        .factory('grabPhotos', function () {
            return 'hello'
        })
        .service('getDataService', ['$http', 'grabPhotos', function ($http, grabPhotos) {
            var gotData = grabPhotos
            this.ding = function(){
                return gotData;
            }
        }])
    .controller('testController', ['$scope', 'getDataService', function ($scope, getDataService) {
        var getDataService = getDataService;
        $scope.test = getDataService.ding();
    }])
})();