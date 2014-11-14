'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the desecClientApp
 */
angular.module('desecClientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
