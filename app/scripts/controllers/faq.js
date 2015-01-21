'use strict';

angular.module('desecClientApp')
	.controller('FaqCtrl', function ($scope) {
		$scope.showFaq = function(idx) {
			$scope.faq = idx;
		};
	});
