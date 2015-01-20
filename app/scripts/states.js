'use strict';

/**
 * Configure the states of the application.
 */
angular.module('desecClientApp').config(function ($urlRouterProvider, $stateProvider, $translateProvider, $locationProvider) {

	// enable hashbang
	$locationProvider.hashPrefix('!');
	
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
	
	console.log('Determined preferred language is ' + $translateProvider.preferredLanguage().toString());

	// set up translations
	$translateProvider.translations('en', {
		'de': 'German | Deutsch',
		'en': 'English',
		'menu': {
			'home': 'Home',
			'products': {
				'headline': 'Plans',
				'silver': 'Silver Plan',
				'gold': 'Gold Plan',
				'platinum': 'Platinum Plan'
			}
		},
		'imprint': 'Imprint',
		'pricing': {
			'headline': 'Pricing',
			'subheadline': 'Check out our rates.',
			'plan1': {
				'headline': 'silver',
				'price': 'free!',
				'feature1': 'Does nothing at all',
				'feature2': 'Doesn\'t cost you any money',
				'feature3': 'Can be used to show off',
				'link': 'Learn more',
			},
			'plan2': {
				'headline': 'gold',
				'price': '4.99€',
				'feature1': 'Can do a little bit',
				'feature2': 'Costs you just some money',
				'feature3': 'A decent deal, overall',
				'link': 'Learn more',
			},
			'plan3': {
				'headline': 'platinum',
				'price': '14.99€',
				'feature1': 'Brings the full power of our service',
				'feature2': 'Costs quite a lot',
				'feature3': 'Shows off, if you want it or not',
				'link': 'Learn more',
			},
		},
		'features': {
			'plan1': {
				'headline': 'Silver Plan',
				'subheadline': 'A Free Plan For Everybody.',
				'feature1': {
					'headline': 'Can Do Absolutely Nothing',
					'text': 'Please enjoy our free product, which will do exactly nothing and does not fit any purpose. It\'s greatest advantage is, it is completely free.'
				},
				'feature2': {
					'headline': 'It\'s Free',
					'text': 'Our product is free and will be free forever.'
				},
				'feature3': {
					'headline': 'Shows Off, If You Want',
					'text': 'It is really easy to show off our product to your friends, and we actually encourage you to do so.'
				}
			},
			'plan2': {
				'headline': 'Gold Plan',
				'subheadline': 'The Mediocre Plan.',
				'feature1': {
					'headline': 'Can Do A Little Bit',
					'text': 'Does definetly more than nothing, but still not everything. If you are looking for a mediocre solution, this is for you.'
				},
				'feature2': {
					'headline': 'Just A Little Cost',
					'text': 'While providing you a mediocre service, it does not cost too moch of your precious money.'
				},
				'feature3': {
					'headline': 'A Decent Deal',
					'text': 'Considering everything, this package provides you with a fairly decent deal.'
				}
			},
			'plan3': {
				'headline': 'Platinum Plan',
				'subheadline': 'The High-End Plan.',
				'feature1': {
					'headline': 'Full Power Of Our Service',
					'text': 'The Platinum Plan provides you with the full force of our service, everything we can do: you get it.'
				},
				'feature2': {
					'headline': 'Costs A Lot',
					'text': 'Full service comes at it\'s cost. Make sure you tell your friends about how much money your are able to spend on a service like ours.'
				},
				'feature3': {
					'headline': 'Shows Off, If You Want It Or Not',
					'text': 'This plan will make you show off, no matter if you want it or not.'
				}
			}			
		}
	});
	$translateProvider.translations('de', {
		'de': 'Deutsch',
		'en': 'Englisch | English',
		'menu': {
			'home': 'Start',
			'products': {
				'headline': 'Pakete',
				'silver': 'Silber',
				'gold': 'Gold',
				'platinum': 'Platin'
			}
		},
		'imprint': 'Impressum',		
		'pricing': {
			'headline': 'Preise',
			'subheadline': 'Usere Preisliste',
			'plan1': {
				'headline': 'silber',
				'price': 'kostenlos!',
				'feature1': 'Kann nichts',
				'feature2': 'Kostet nichts',
				'feature3': 'Für Angeber',
				'link': 'Mehr Infos',
			},
			'plan2': {
				'headline': 'gold',
				'price': '4.99€',
				'feature1': 'Kann ein bisschen was',
				'feature2': 'Kostet ein bisschen Geld',
				'feature3': 'Ganz gutes Angebot, so insgesamt',
				'link': 'Mehr Infos',
			},
			'plan3': {
				'headline': 'platin',
				'price': '14.99€',
				'feature1': 'Alle unsere Stärken',
				'feature2': 'Kostet schon etwas',
				'feature3': 'Ist ein Statussymbol, ob man es möchte oder nicht',
				'link': 'Mehr Infos',
			},
		},
		'features': {
			'plan1': {
				'headline': 'Das silberne Paket',
				'subheadline': 'Das kostenlose Paket für Jeden.',
				'feature1': {
					'headline': 'Kann einfach gar nichts.',
					'text': 'Genießen Sie unser kostenlosen Paket, das einfach gar nichts kann und zu nichts gut ist. Das Beste daran ist, es ist kostenlos!'
				},
				'feature2': {
					'headline': 'Kostenlos',
					'text': 'Unser Produkt ist kostenlos und wird es immer sein.'
				},
				'feature3': {
					'headline': 'Für Angeber',
					'text': 'Dieses Paket eigenet sich bestens um bei deinen Freunden damit anzugeben, und wir empfehlen dies auch zu tun.'
				}
			},
			'plan2': {
				'headline': 'Das goldene Paket',
				'subheadline': 'Unser mittelmäßiges Paket.',
				'feature1': {
					'headline': 'Kann ein bisschen was',
					'text': 'Dieses Paket kann ein bisschen was, aber immer noch nicht alles. Wenn Sie nach mittelmäßigen Lösungen suchen, sind Sie hier genau richtig.'
				},
				'feature2': {
					'headline': 'Kostet nur ein bisschen',
					'text': 'Für mittelmäßigen Service müssen Sie bei uns auch nur mittelmäßig zahlen.'
				},
				'feature3': {
					'headline': 'Ein ganz gutes Angebot',
					'text': 'Unter\'m Strich ist das ein ganz gutes Angebot.'
				}
			},
			'plan3': {
				'headline': 'Das Platin-Paket',
				'subheadline': 'Alles in einem Paket.',
				'feature1': {
					'headline': '100% Service',
					'text': 'Das Platin-Paket gibt Ihnen alles, was wir können.'
				},
				'feature2': {
					'headline': 'Ziemlich teuer',
					'text': 'Guter Service hat seinen Preis. Wir empfehlen Ihnen, alle Ihre Freunde darüber zu informieren, wie viel Geld Sie für sowas ausgeben können.'
				},
				'feature3': {
					'headline': 'Angeben, ob Sie wollen oder nicht',
					'text': 'Unser Statussymbol wird Sie unverzüglich und permanent zum Angeber machen.'
				}
			}
		}
	});

	// Set up i18n root state
	$stateProvider.state('i18n', {
		template: '<ui-view/>',
		url: '/:lang',
		abstract: true,
		controller: function($translate, $stateParams, $state) {
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
			$translate.use($stateParams.lang);
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
	
		.state('i18n.product.silver', {
			url: "/silver",
			templateUrl: "views/products/silver.html"
		})

		.state('i18n.product.gold', {
			url: "/gold",
			templateUrl: "views/products/gold.html"
		})

		.state('i18n.product.platinum', {
			url: "/platinum",
			templateUrl: "views/products/platinum.html"
		})

	$urlRouterProvider.otherwise('/');
	
});
