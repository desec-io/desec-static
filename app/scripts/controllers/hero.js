'use strict';

angular.module('desecClientApp').controller('HeroCtrl', function($scope, $timeout) {
	var SLIDE_COUNT = 2;
	var timer;
	
	$scope.slideIndex = 0;
	
	function cancelTimer() {
		if (timer)
			$timeout.cancel(timer);
	}
	
	function nextSlide() {
		cancelTimer();
		$scope.slideIndex = ($scope.slideIndex + 1) % SLIDE_COUNT;
		$timeout(nextSlide, 10000);
	}
	
	$timeout(nextSlide, 10000);
	
	$scope.showSlide = function(idx) {
		cancelTimer();
		$scope.slideIndex = idx;
	};
	
	$scope.$on('$destroy', function() {
		cancelTimer();
	});
	
});
