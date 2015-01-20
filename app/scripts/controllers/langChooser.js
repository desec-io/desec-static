angular.module('desecClientApp').controller('LangChooserCtrl', function($stateParams, $state, $scope, $rootScope, $translate) {

	function updateScopeI18n() {
		
		if (!$state.includes('i18n')) {
			$scope.i18n = false;
			$rootScope.lang = $translate.use();
			return;
		}
	
		var languages = ['en', 'de'];
		
		// create stateParams for language switch, one for each language
		var href = {};
		var otherLang = angular.copy(languages);
		otherLang.splice(languages.indexOf($stateParams.lang), 1);
		angular.forEach(otherLang, function(lang) {
			var params = angular.copy($stateParams);
			params.lang = lang;
			href[lang] = $state.href($state.$current.toString(), params);
		});
		
		$scope.i18n = {
			currentState: $state.$current.toString(),
			currentLang: $stateParams.lang,
			otherLang: otherLang,
			href: href,
		};
		
		$rootScope.lang = $translate.use();
		
	}
	
	$rootScope.$on('$stateChangeSuccess', updateScopeI18n);

});
