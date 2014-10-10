'use strict';

/**
 * @ngdoc function
 * @name densClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the densClientApp
 */
angular.module('densClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
