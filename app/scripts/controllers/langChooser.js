angular.module('desecClientApp').controller('LangChooserCtrl', function($stateParams, $state, $scope, $rootScope, $translate) {

	function updateScopeI18n() {
		
		$scope.i18n = $state.includes('i18n');
		var languages = ['en', 'de'];
		
		// create stateParams for language switch, one for each language
		var href = {};
		angular.forEach(languages, function(lang) {
			var params = angular.copy($stateParams);
			params.lang = lang;
			href[lang] = $state.href($state.$current.toString(), params);
		});
		
		$scope.i18n = {
			currentState: $state.$current.toString(),
			currentLang: $translate.use(),
			languages: languages,
			href: href,
		};
		
	}
	
	$rootScope.$on('$stateChangeSuccess', updateScopeI18n);

});
