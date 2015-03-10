angular.module('desecClientApp').controller('LangChooserCtrl', function($stateParams, $state, $scope, $rootScope, $translate) {

	function updateScopeI18n() {
		
		var languages = ['en', 'de', 'cn'];
		
		// create stateParams for language switch, one for each language
		var href = {};
		angular.forEach(languages, function(lang) {
			var params = angular.copy($stateParams);
			params.lang = lang;
			href[lang] = $state.href($state.$current.toString(), params, { absolute: true });
		});
		
		var otherLang = angular.copy(languages);
		otherLang.splice(otherLang.indexOf($translate.use()), 1);
		
		$scope.i18n = {
			currentState: $state.$current.toString(),
			currentLang: $translate.use(),
			otherLang: otherLang,
			languages: languages,
			href: href,
			enabled: $state.includes('i18n'),
		};
		
	}
	
	$rootScope.$on('langChanged', updateScopeI18n);
	$rootScope.$on('$stateChangeSuccess', updateScopeI18n);

});
