'use strict';

angular.module('desecClientApp')
	.controller('LogjamScannerCtrl', function ($scope, $http) {

		// This page is a state machine.
		// -> input -> scanning -> result -|
		//       ^            |--> error  -|
		//       |------------|------------|
		//
		$scope.status = 'input';
		
		$scope.result = $scope.error = undefined;
		$scope.host = 'desec.io';
		$scope.port = 443;
		$scope.scan = function() {
			$scope.status = 'scanning';
			$scope.result = $scope.error = undefined;
			$http.get('/api/scan/logjam', { params: { host: $scope.host, port: $scope.port }})
				.success(function(data) {
					$scope.status = 'result';
					$scope.result = data;
				})
				.error(function(data, status) {
					$scope.status = 'error';
					$scope.error = {
						data: data,
						status: status
					}
				})
			;
		}
	});
