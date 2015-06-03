'use strict';

angular.module('desecClientApp')
	.factory('resourceDefaultActions', function () {
		return {
			'get': {method: 'GET'},
			'post': {method: 'POST'},
			'update': {method: 'PUT'},
			'patch': {method: 'PATCH'},
			'query': {method: 'GET', isArray: true},
			'delete': {method: 'DELETE'}
		};
	});
