(function () {
    'use strict';
    var toybox_app = angular.module('toybox_app', ['ui.bootstrap']);
    toybox_app.controller('testController', ['$scope', function ($scope) {
        $scope.test = 'a test'
        console.log($scope);
    }])
})();