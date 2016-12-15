'use strict';

angular.module('desecClientApp')
	.controller('DonationCtrl', function ($scope, auth, $http, $translate) {

		$scope.loading = false;
		$scope.d = { amount: 10 };
		$scope.success = false;
		$scope.error = '';
		
		$scope.donate = function() {

			$scope.loading = true;
			$scope.error = '';
			
			$http.post('/api/v1/donation/', $scope.d).then(
				// sucess
				function(resp) {
					$scope.loading = false;
					$scope.success = true;
					$scope.d.iban = resp.data.iban; 
				},
				// error
				function() {
					$scope.loading = false;
					$scope.error = $translate('donation.directdebit.form.error');
				}
			);
			
		};
		
	});
