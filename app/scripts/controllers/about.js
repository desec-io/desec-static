'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the desecClientApp
 */
angular.module('desecClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
