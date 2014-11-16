'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.controller:DomainListCtrl
 * @description
 * # DomainListCtrl
 * Controller that manages the domain list
 */
angular.module('desecClientApp')
	.controller('DomainListCtrl', function ($scope, $http) {
		$http.get('/api/domains/').success(function(data) {
			$scope.domains = data;
		});
	});
