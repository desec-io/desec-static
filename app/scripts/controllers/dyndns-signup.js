'use strict';

angular.module('desecClientApp')
	.controller('DyndnsSignupCtrl', function ($scope, auth, domain, $analytics) {

		$scope.loading = false;
		$scope.password = Math.abs(Math.random().toString().split('').reduce(function(p,c){return (p<<5)-p+c})).toString(36).substr(0,11);
		$scope.user = auth.user;
		$scope.email = $scope.user.username;
		
		$scope.signup = function() {

			$scope.loading = true;
			$scope.error = '';
			
			if (!auth.user.username) {
				auth.register($scope.email, $scope.password).then(
					// success
					function() {
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
		
		function registerDomain() {
			var d = new domain({
				'name': $scope.domain + '.dedyn.io',
			});
			d.$post(
				null,
				function() { // success
					$scope.loading = false;
					$scope.success = true;
					$analytics.eventTrack('signupsuccess', {  category: 'dyndns', label: 'signupsuccess' });
				},
				function() { // error
					$scope.error = 'products.dyndns.signup.error.domain';
					$scope.loading = false;
				}
			);
		}
		
	});
