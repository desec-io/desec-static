angular.module('desecClientApp')
	.run(['$anchorScroll', function($anchorScroll) {
		$anchorScroll.yOffset = 100;   // always scroll by 50 extra pixels
	}])
	.controller('anchorCtrl', ['$anchorScroll', '$location', '$scope',
		function($anchorScroll, $location, $scope) {
			$scope.gotoAnchor = function(x) {
				var newHash = x;
				if ($location.hash() !== newHash) {
					// set the $location.hash to `newHash` and
					// $anchorScroll will automatically scroll to it
					$location.hash(x);
				} else {
					// call $anchorScroll() explicitly,
					// since $location.hash hasn't changed
					$anchorScroll();
				}
			};
		}
	]);
