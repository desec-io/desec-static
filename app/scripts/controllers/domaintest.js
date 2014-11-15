'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller that manages the domain test form
 */
angular.module('desecClientApp')
	.controller('DomainTestCtrl', function ($scope, $http) {
		/**
		 * The current state of the domain test form.
		 * 0: starting state
		 * 1: getting information
		 * 2: information available
		 * 3: error getting information
		 * @type {number}
		 */
		$scope.state = 0;
		
		$scope.domaintest = function(domain) {
			$scope.state = 1;
			$http.get('/api/test/' + domain)
			.success(function(data, status, headers, config) {
					$scope.state = 2;
					scope.protected = data.protected;
				})
			.error(function(data, status, headers, config) {
					$scope.state = 3;
				});
		};
	});
