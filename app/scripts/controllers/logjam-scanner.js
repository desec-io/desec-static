'use strict';

angular.module('desecClientApp')
	.controller('LogjamScannerCtrl', function ($scope, $http, $q, $stateParams) {

		// This page is a state machine.
		// -> input -> scanning -> result -|
		//       ^            |--> error  -|
		//       |------------|------------|
		//
		$scope.status = 'input';
		
		$scope.result = $scope.error = undefined;
		$scope.host = $stateParams.domain || 'desec.io';
		$scope.port = $stateParams.port || 443;
		$scope.starttls = $stateParams.starttls || 'none';
		
		$scope.presets = [
			{ name: 'FTP', port: '21', starttls: 'ftp' },
			{ name: 'SMTP', port: '25', starttls: 'smtp' },
			{ name: 'POP3', port: '110', starttls: 'pop3' },
			{ name: 'IMAP', port: '143', starttls: 'imap' },
			{ name: 'HTTPS', port: '443', starttls: 'none' },
			{ name: 'SMTP', port: '587', starttls: 'smtp' },
			{ name: 'IMAPS', port: '993', starttls: 'none' },
			{ name: 'POP3S', port: '995', starttls: 'none' },
			{ name: 'XMPP', port: '5222', starttls: 'xmpp' },
		];
		
		$scope.preset = function(p) {
			$scope.port = p.port;
			$scope.starttls = p.starttls;
		}

		var canceler = undefined;
		$scope.scan = function() {
			$scope.status = 'scanning';
			$scope.result = $scope.error = undefined;
			
			// cancel previous, if any 
			if (canceler)
				canceler.resolve();
			canceler = $q.defer();
			
			$http.get('/api/v1/scan/logjam', { timeout: canceler.promise, params: { host: $scope.host, port: $scope.port, starttls: $scope.starttls }})
				.success(function(data) {
					$scope.status = 'result';
					$scope.result = data;
				})
				.error(function(data, status) {
					// if request was canceled (status==0), do nothing
					if (status !== 0) {
						$scope.status = 'error';
						$scope.error = {
							data: data,
							status: status
						}
					}
				})
			;
		}
		
		$scope.startover = function() {
			$scope.status = 'input';
			$scope.result = $scope.error = undefined;
			
			// cancel request, if any 
			if (canceler)
				canceler.resolve();
		}
		
		if ($stateParams.showresult) {
			$scope.scan();
		}
		
	});
