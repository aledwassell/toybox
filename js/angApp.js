(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ngResource'])
        .factory('getGiffs', function($resource){
            return $resource('https://api.giphy.com/v1/gifs/search?api_key=RY20njLFYdgoLq572vuNe1QJEzs7qoVS &q= &limit=25&offset=0&rating=G&lang=en', {}, {
                get: {
                    method: 'GET',
                    url: 'https://api.giphy.com/v1/gifs/search?api_key=RY20njLFYdgoLq572vuNe1QJEzs7qoVS&limit=25&offset=0&rating=G&lang=en&q=:query',
                    query: '@query'
                }
            })
        })
        .service('getDataService', ['$http', 'getGiffs', function ($http, getGiffs) {
            var getGiffs = getGiffs;
            this.getGiffs = function(){
                return getGiffs.get({query: cheese});
            }
        }])
        .controller('giffController', ['$scope', 'getDataService', function($scope, getDataService){
            $scope.getDataService = getDataService;
            $scope.giffs = getDataService.getGiffs({query: 'cheese'})
        }])
})();