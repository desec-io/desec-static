'use strict';

/**
 * @ngdoc function
 * @name densClientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller that manages the sign up form
 */
angular.module('densClientApp')
	.controller('SignUpCtrl', function ($scope) {
		$scope.step = 1;
		$scope.signup = {};
	});
