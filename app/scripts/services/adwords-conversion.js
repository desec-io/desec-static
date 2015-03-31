'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.service:trackAdWordsConversion
 * @description
 * Service that tracks AdWords conversions.
 */
angular.module('desecClientApp')
	.factory('trackAdWordsConversion', function () {
		function goog_report_conversion() {
			window.google_conversion_format = "3";
			window.google_is_call = true;
			var opt = new Object();
			opt.onload_callback = angular.noop;
			var conv_handler = window['google_trackConversion'];
			if (typeof(conv_handler) == 'function') {
				conv_handler(opt);
			}
		}

		/**
		 * Tracks an AdWords conversion. Obtain the parameters from AdWords conversion tracking.
		 * 
		 * id: int. conversion id
		 * label: string. conversion label
		 * remarketing: bool. remarketing only
		 */
		return function(id, label, remarketing) {
			var w = window;
			w.google_conversion_id = id;
			w.google_conversion_label = label;
			w.google_remarketing_only = remarketing;			
			goog_report_conversion();
		}
	});
