'use strict';

angular.module('desecClientApp')
	.controller('SubscribeCtrl', function ($scope, trackAdWordsConversion) {
		$scope.track = function() {
			trackAdWordsConversion(
				957766785, // id
				"IXYECO6D81oQgbnZyAM", // label
				false // remarketing
			);
		};
	});
