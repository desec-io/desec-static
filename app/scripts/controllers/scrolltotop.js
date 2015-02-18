'use strict';

angular.module('desecClientApp')
	.controller('ScrollToTopCtrl', function ($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function() {
			window.scrollTo(0, 0); // TODO best practice
		});
	});
