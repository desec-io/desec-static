'use strict';

/**
 * Configure the states of the application.
 */
angular.module('desecClientApp').config(function ($urlRouterProvider, $stateProvider, $translateProvider, $locationProvider) {

	// enable hashbang
	$locationProvider.hashPrefix('!');
	
	// available languages, first one is preferred
	var languages = ['en', 'de', 'cn'];

	// preferred language
	$translateProvider
		.registerAvailableLanguageKeys(languages, {
			'en_US': 'en',
			'en_UK': 'en',
			'en_AU': 'en',
			'en_NZ': 'en',
			'de_DE': 'de',
			'de_CH': 'de',
			'de_AT': 'de',
			'zh_CN': 'cn',
			'zh_HK': 'cn',
			'zh_MO': 'cn',
			'zh_SG': 'cn',
			'zh_TW': 'cn',
		})
		.determinePreferredLanguage();
	
	// set up translations
	$translateProvider.useStaticFilesLoader({
		prefix: 'texts/',
		suffix: '.json'
	});
	
	// Set up i18n root state
	$stateProvider.state('i18n', {
		template: '<ui-view/>',
		url: '/:lang',
		abstract: true,
		controller: function($translate, $stateParams, $state, $rootScope) {
			if (!$stateParams.lang) {
				// No language requested. Use preferred language as determined by angular-translate.
				$state.go($state.$current, {lang: $translate.preferredLanguage()});
				return;
			}
			if (languages.indexOf($stateParams.lang) == -1) {
				if ($stateParams.lang !== $translate.preferredLanguage()) {					
					// Requested language unavailable and different from preferred language. Use preferred language.
					$state.go($state.$current, {lang: $translate.preferredLanguage()});
				} else {
					// Requested and preferred language unavailable. Use default language.
					$state.go($state.$current, {lang: languages[0]});
				}
				return;
			}
			
			// Save requested language as preferred and use it.
			$translate.preferredLanguage($stateParams.lang);
			if ($stateParams.lang)
				$rootScope.lang = $stateParams.lang;
			if ($translate.use() !== $stateParams.lang)
				$translate.use($stateParams.lang).then(function() { $rootScope.$emit('langChanged') });
			else
				$rootScope.$emit('langChanged');
		}
	});
	
	$stateProvider
		
		.state('root', {
			url: '/',
			controller: function($translate, $state) {
				$state.go('i18n.home', {lang: $translate.preferredLanguage()});
			}
		})
		
		.state('imprint', {
			url: '/imprint',
			templateUrl: "views/imprint.html"
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

		.state('i18n.product.tunneldns', {
			url: "/tunneldns",
			templateUrl: "views/products/tunneldns.html"
		})

		.state('i18n.product.anydns', {
			url: "/anydns",
			templateUrl: "views/products/anydns.html"
		})

		.state('i18n.product.geodns', {
			url: "/geodns",
			templateUrl: "views/products/geodns.html"
		})

		.state('i18n.product.golddns', {
			url: "/golddns",
			templateUrl: "views/products/golddns.html"
		})

		.state('i18n.logjam', {
			url: "/logjam-scanner",
			templateUrl: "views/logjam-scanner.html"
		})

	$urlRouterProvider.otherwise('/');
	
});
