'use strict';

angular.module('desecClientApp').controller('HeroCtrl', function($scope, $timeout) {
	var SLIDE_COUNT = 2;
	var timer;
	
	$scope.slideIndex = 0;
	
	function cancelTimer() {
		if (timer)
			$timeout.cancel(timer);
	}
	
	function setTimer() {
		timer = $timeout(nextSlide, 10000);
	}
	
	function nextSlide() {
		cancelTimer();
		$scope.slideIndex = ($scope.slideIndex + 1) % SLIDE_COUNT;
		setTimer();
	}
	
	//setTimer(); // uncomment this to start playing the slideshow automatically
	
	$scope.showSlide = function(idx) {
		cancelTimer();
		$scope.slideIndex = idx;
	};
	
	$scope.$on('$destroy', function() {
		cancelTimer();
	});
	
});
