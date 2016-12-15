'use strict';

angular.module('desecClientApp')
	.factory('domain', function ($resource, resourceDefaultActions) {
		return $resource(
			// URL
			'/api/v1/domains/:id/',
			
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
