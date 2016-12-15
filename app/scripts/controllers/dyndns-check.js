'use strict';

angular.module('desecClientApp')
	.controller('DyndnsCheckCtrl', function ($scope, $stateParams, $http) {
		
		$scope.check = function() {
			$scope.loading = true;
			$scope.domainname = $stateParams.domain;
			$http.get('/api/v1/dns', { params: { domain: $scope.domainname } })
				.success(function(data) {
					$scope.domain = data;
					$scope.loading = false;
					if ($scope.domain.a.length > 0 && $scope.domain.aaaa.length > 0) {
						$scope.ipaddr = $scope.domain.a[0] + ', ' + $scope.domain.aaaa[0];
					} else if ($scope.domain.a.length > 0) {
						$scope.ipaddr = $scope.domain.a[0];
					} else if ($scope.domain.aaaa.length > 0) {
						$scope.ipaddr = $scope.domain.aaaa[0];
					} else {
						$scope.ipaddr = '';
					}
				})
				.error(function() {
					$scope.domain = null;
					$scope.loading = false;
					$scope.ipaddr = '';
				});
		};

		$scope.loading = false;
		$scope.ipaddr = '';
		$scope.check();
		
	});
