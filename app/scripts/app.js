'use strict';

/**
 * @ngdoc overview
 * @name desecClientApp
 * @description
 * # desecClientApp
 *
 * Main module of the application.
 */
angular.module('desecClientApp', [
		//'ui.router',
		'pascalprecht.translate',
	])

angular.module('desecClientApp').config(function($translateProvider) {
		
		$translateProvider.preferredLanguage('en');

		$translateProvider.translations('en', {
			'TITLE': 'Hello',
			'FOO': 'This is a paragraph'
		});

		$translateProvider.translations('de', {
			'TITLE': 'Hallo',
			'FOO': 'Dies ist ein Paragraph'
		});
		
	})
