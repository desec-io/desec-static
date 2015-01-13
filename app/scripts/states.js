'use strict';

/**
 * Configure the states of the application.
 */
angular.module('desecClientApp').config(function ($urlRouterProvider, $stateProvider, $translateProvider) {

	// available languages, first one is preferred
	var languages = ['en', 'de'];

	// preferred language
	$translateProvider
		.registerAvailableLanguageKeys(['en', 'de'], {
			'en_US': 'en',
			'en_UK': 'en',
			'en_AU': 'en',
			'en_NZ': 'en',
			'de_DE': 'de',
			'de_CH': 'de',
			'de_AT': 'de'
		})
		.determinePreferredLanguage();

	// set up translations
	angular.forEach(languages, function (lang) {
		$translateProvider.translations(lang, {
			'TITLE': 'This is ' + lang,
			'FOO': 'This is a <strong>' + lang + '</strong> paragraph'
		});
	});

	// Set up i18n root state
	$stateProvider.state('i18n', {
		template: '<ui-view/>',
		url: '/:lang',
		abstract: true,
		controller: function($translate, $stateParams) {
			$translate.use($stateParams.lang);
		}
	})
	
	$stateProvider
		
		.state('root', {
			url: '/',
			controller: function($translate, $state) {
				$state.go('i18n.home', {lang: $translate.preferredLanguage()});
			}
		})

		.state('i18n.home', {
			url: "/",
			templateUrl: "views/homepage.html"
		})
		
		.state('i18n.product', {
			url: '/product',
			template: '<ui-view/>'
		})
	
		.state('i18n.product.dyndns', {
			url: "/dyndns",
			templateUrl: "views/products/dyndns.html"
		})

	$urlRouterProvider.otherwise('/');
	
});
