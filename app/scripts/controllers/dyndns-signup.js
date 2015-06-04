'use strict';

angular.module('desecClientApp')
	.controller('DyndnsSignupCtrl', function ($scope, auth, domain) {

		$scope.loading = false;
		$scope.password = Math.abs(Math.random().toString().split('').reduce(function(p,c){return (p<<5)-p+c})).toString(36).substr(0,11);
		$scope.email = '';
		$scope.user = null;
		
		$scope.signup = function() {

			$scope.loading = true;
			$scope.error = '';
			
			if (!$scope.user) {
				auth.register($scope.email, $scope.password).then(
					// success
					function() {
						$scope.user = $scope.email;
						auth.login($scope.email, $scope.password).then(
							// success
							function() {
								registerDomain();
							},
							// error
							function() {
								$scope.error = 'products.dyndns.signup.error.unknown';
								$scope.loading = false;
							}
						)
					},
					// error
					function() {
						$scope.error = 'products.dyndns.signup.error.email';
						$scope.loading = false;
					}
				)
			} else {
				registerDomain();
			}
			
		};
		
		$scope.check = function() {
			
			// TODO forward user to check page
			
		}
		
		function registerDomain() {
			var d = new domain({
				'name': $scope.domain + '.dedyn.io',
				'dyn': true
			});
			d.$post(
				null,
				function() { // success
					$scope.loading = false;
					$scope.success = true;
				},
				function() { // error
					$scope.error = 'products.dyndns.signup.error.domain';
					$scope.loading = false;
				}
			);
		}
		
	});
