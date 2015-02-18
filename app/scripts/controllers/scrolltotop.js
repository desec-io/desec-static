'use strict';

angular.module('desecClientApp')
	.controller('ScrollToTopCtrl', function ($rootScope, $scope) {
		$rootScope.$on('$stateChangeSuccess', function() {
			$scope.top();
		});
		$scope.top = function() {
			window.scrollTo(0, 0); // TODO best practice
		}
	});
