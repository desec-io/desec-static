'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller that manages the sign up form
 */
angular.module('desecClientApp')
	.controller('SignUpCtrl', function ($scope) {
		$scope.step = 1;
		$scope.signup = {};
	});
