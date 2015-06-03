'use strict';

angular.module('desecClientApp')
	.factory('domain', function ($resource, resourceDefaultActions) {
		return $resource(
			// URL
			'/api/domains/:id/',
			
			// Parameters
			{
				'id': '@id'
			},
			
			// Actions
			resourceDefaultActions,
			
			// Configuration
			{
				stripTrailingSlashes: false
			}
		);
	});
