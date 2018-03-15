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

            let ctx = document.getElementById('doughnut').getContext('2d');
            let gradientColors = [
                {
                    start: '#f3bb98',
                    end: '#ea8ba9'
                },
                {
                    start: '#F6A064',
                    end: '#ED5384'
                }
            ];

            let gradients = [];

            gradientColors.forEach( function( item ){
                var gradient = ctx.createLinearGradient(50, 50, 150 , 150);
                gradient.addColorStop(0, item.start);
                gradient.addColorStop(1, item.end);
                gradients.push(gradient);
            });


            const alterValues = (a, b, c, d) => {
                const total = $scope.data.reduce((acc, curr) => acc + curr);

                if(d === 0){
                    return;
                } else if(d > 0){
                    b = b - d;
                }
                $scope.data[1] = b
                console.log(d, 'd');
                console.log(b, 'b');

            }
            $scope.$watch('slider.value', function () {
                console.log($scope.slider.value);
                $scope.data[1] = $scope.slider.value;
            });
            console.log(gradients, ctx)

            $scope.labels = ["Download Sales", "In-Store Sales"];
            $scope.data = [
                {
                    value: 75,
                    color: gradients[0]
                },
                {
                    value:25,
                    color: gradients[1]
                }
            ];
            $scope.colors = gradientColors;

            $scope.options = {
                cutoutPercentage: 50,
                rotation: -1 * Math.PI,
                circumference: Math.PI
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