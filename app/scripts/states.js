'use strict';

/**
 * Configure the states of the application.
 */
angular.module('desecClientApp').config(function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise("/");

	// Now set up the states
	$stateProvider
		.state('homepage', {
			url: "/",
			templateUrl: "views/homepage.html"
		})
		.state('dashboard', {
			url: "/dashboard",
			templateUrl: "views/dashboard.html"
		})
		.state('dashboard.domainadd', {
			url: "/dashboard/add",
			templateUrl: "views/domainadd.html"
		})
		.state('dashboard.domaintest', {
			url: "/dashboard/test",
			templateUrl: "views/domaintest.html"
		})
		.state('dashboard.domainlist', {
			url: "/dashboard/list",
			templateUrl: "views/domainlist.html",
			controller: "DomainListCtrl"
		})
});
