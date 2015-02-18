'use strict';

angular.module('desecClientApp')
	.controller('NavigationCtrl', function ($scope) {
		$scope.close = function() {
			$scope.open = false;
		}
		$scope.close();
	});
