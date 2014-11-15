'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller that manages the sign up form
 */
angular.module('desecClientApp')
	.controller('RegisterCtrl', function ($scope, $http, $state, auth) {
		/**
		 * The current state of the sign up form.
		 * 0: starting state
		 * 1: trying to register
		 * 2: successfully registered, logging in
		 * 3: registration failed
		 * 4: registered and logged in
		 * @type {number}
		 */
		$scope.state = 0;
		$scope.register = function(email, password) {
			$scope.state = 1;
			$http.post('/api/auth/register', {
				email: email,
				password: password,
			})
			.success(function(data, status, headers, config) {
					$scope.state = 2;
					auth.login(email, password).then(
						function() {
							$scope.state = 4;
							$state.go('dashboard');
						},
						function() {
							$scope.state = 3;
						}
					);
				})
			.error(function(data, status, headers, config) {
					$scope.state = 3;
				});
		};
	});
