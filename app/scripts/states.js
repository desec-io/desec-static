'use strict';

/**
 * Configure the states of the application.
 */
angular.module('desecClientApp').config(function ($urlRouterProvider, $stateProvider, $translateProvider, $locationProvider, $resourceProvider) {

	// don't remove trailing slashes from resources (this is an API requirement)
	$resourceProvider.defaults.stripTrailingSlashes = false;
	
	// enable hashbang
	$locationProvider.hashPrefix('!');
	
	// available languages, first one is preferred
	var languages = ['en', 'de'];

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

		.state('privacy-policy', {
			url: '/privacy-policy',
			templateUrl: "views/privacy-policy.html"
		})

		.state('i18n.home', {
			url: "/",
			templateUrl: "views/homepage.html"
		})

		.state('i18n.donation', {
			url: "/donation",
			templateUrl: "views/donation.html"
		})
		
		.state('i18n.product', {
			url: '/product',
			template: '<ui-view/>'
		})
	
		.state('i18n.product.dyndns', {
			url: "/dyndns",
			templateUrl: "views/products/dyndns.html"
		})

		.state('i18n.product.anydns', {
			url: "/anydns",
			redirectTo: "i18n.product.dnshosting"
		})
		
		.state('i18n.product.dnshosting', {
			url: "/dnshosting",
			templateUrl: "views/products/dnshosting.html"
		})

		.state('i18n.tools', {
			url: '/tools',
			template: '<ui-view/>'
		})
	
		.state('i18n.tools.dyndns', {
			url: "/dyndns-check?domain",
			templateUrl: "views/dyndns-check.html"
		})
	
		.state('i18n.docs', {
			url: '/docs',
			template: '<ui-view/>'
		})		
		
		.state('i18n.docs.dyndnsclient', {
			url: "/dyndns-client",
			templateUrl: "views/docs/dyndns-client.html"
		})
		
		.state('i18n.docs.updateapidetails', {
			url: "/update-api-details",
			templateUrl: "views/docs/update-api-details.html"
		})
	
	$urlRouterProvider.otherwise('/');
	
});

angular.module('desecClientApp').run(function($rootScope, $state) {
	
	// Honor redirectTo paramters
	$rootScope.$on('$stateChangeStart', function(evt, to, params) {
		if (to.redirectTo) {
			evt.preventDefault();
			$state.go(to.redirectTo, params)
		}
	});
	
});
