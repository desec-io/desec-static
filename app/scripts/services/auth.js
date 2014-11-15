'use strict';

/**
 * @ngdoc function
 * @name desecClientApp.service:auth
 * @description
 * # auth
 * Service that provides login and logout functionality for the desec API
 */
angular.module('desecClientApp')
	.factory('auth', function ($http, $q) {
		
		/**
		 * Email of the currently logged in user, if state == 2, undefined otherwise.
		 * @type {string}
		 */
		var current = undefined;
		
		/**
		 * The current authentication state.
		 * 0: logged out
		 * 1: login in progress
		 * 2: logged in
		 * 3: logout in progress
		 * @type {number}
		 */
		var state = 0;
		
		function set$httpAuthInfo(token) {
			if (token) {
				$http.defaults.headers.common.Authorization = 'Token ' + token;
			} else {
				if ($http.defaults.headers.common.Authorization)
					$http.defaults.headers.common.Authorization = '';
			}
		}
		
		function login(email, password) {
			var deferred = $q.defer();

			if (state!=0) {
				deferred.reject();
				return deferred.promise;
			}
			
			state = 1;
			$http.post('/api/auth/login', {
				email: email,
				password: password,
			})
			.success(function(data) {
					state = 2;
					current = email;
					set$httpAuthInfo(data['auth_token']);
					deferred.resolve(email);
				})
			.error(function() {
					state = 0;
					deferred.reject();
				})
			
			return deferred.promise;
		}
		
		function logout() {
			var deferred = $q.defer();
			
			if (state!=2) {
				deferred.reject();
				return deferred.promise;
			}
			
			state = 3;
			$http.post('/api/auth/logout')
				.success(function(data) {
					state = 0;
					current = undefined;
					set$httpAuthInfo();
					deferred.resolve();
				})
				.error(function() {
					state = 2;
					deferred.reject();
				})

			return deferred.promise;
		}
		
		function user() {
			return current;
		}
		
		// remove all pre-set auth info
		set$httpAuthInfo();
		
		return {
			login: login,
			logout: logout,
			user: user,
		};
	});
