'use strict';

describe('auth service', function () {
	var $compile, scope, $exceptionHandler, $compileProvider, $http, $httpBackend, auth;

	beforeEach(module('desecClientApp'));

	beforeEach(module(function (_$compileProvider_) {
		$compileProvider = _$compileProvider_;
	}));

	beforeEach(module(function ($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode('log');
	}));

	beforeEach(inject(function (_$compile_, $rootScope, _$exceptionHandler_, _$http_, _$httpBackend_, _auth_) {
		$compile = _$compile_;
		$exceptionHandler = _$exceptionHandler_;
		scope = $rootScope.$new();
		$http = _$http_;
		$httpBackend = _$httpBackend_;
		auth = _auth_;
		$httpBackend.when('GET', 'texts/en.json').respond({});
	}));

	afterEach(function () {
		if ($exceptionHandler.errors.length) {
			/* global dump */
			dump(jasmine.getEnv().currentSpec.getFullName());
			dump('$exceptionHandler has errors');
			dump($exceptionHandler.errors);
			expect($exceptionHandler.errors).toBe([]);
		}
		//dealoc(element); // TODO see if we need to dealoc
	});

	describe('register function', function() {
		
		it('POSTs the email address and password to /api/auth/register', function() {
			$httpBackend.expect('POST', '/api/auth/register', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(201, '{"email":"shitman@desec.io"}');
			auth.register('shitman@desec.io', 'shit');
			$httpBackend.flush();
		});

		it('resolves the returned promise when successfully registered', function() {
			$httpBackend.expect('POST', '/api/auth/register', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			var result = 0;
			auth.register('shitman@desec.io', 'shit').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
		});

		it('rejects the returned promise when registration fails', function() {
			$httpBackend.expect('POST', '/api/auth/register', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(400);
			var result = 0;
			auth.register('shitman@desec.io', 'shit').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(2);
		});
		
	});
	
	describe('login function', function() {
		
		it('POSTs the credentials to /api/auth/login', function() {
			$httpBackend.expect('POST', '/api/auth/login', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
		});
		
		it('sets the received auth token to be used with $http', function() {
			$httpBackend.expect('POST', '/api/auth/login', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
			expect($http.defaults.headers.common.Authorization).toBe('Token ThisIsATestAuthToken');
		});
		
		it('resolves the returned promise when successfully logged in', function() {
			$httpBackend.expect('POST', '/api/auth/login', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			var result = 0;
			auth.login('johndoe@desec.io', 'john').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
		});

		it('rejects the returned promise when login fails', function() {
			$httpBackend.expect('POST', '/api/auth/login', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(400);
			var result = 0;
			auth.login('johndoe@desec.io', 'john').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(2);
		});

	});
	
	describe('logout function', function() {
		
		beforeEach(function() {
			// simulate login
			$httpBackend.expect('POST', '/api/auth/login', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
		})
		
		it('POSTs to /api/auth/logout', function() {
			$httpBackend.expect('POST', '/api/auth/logout').respond(200);
			auth.logout();
			$httpBackend.flush();
		});

		it('clears auth token to be used with $http', function() {
			$httpBackend.expect('POST', '/api/auth/logout').respond(200);
			auth.logout();
			$httpBackend.flush();
			expect($http.defaults.headers.common.Authorization).toBe('');
		});

		it('resolves the returned promise when successfully logged out', function() {
			$httpBackend.expect('POST', '/api/auth/logout').respond(200);
			var result = 0;
			auth.logout().then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
		});

		it('rejects the returned promise when logout fails', function() {
			$httpBackend.expect('POST', '/api/auth/logout').respond(400);
			var result = 0;
			auth.logout().then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(2);
		});
		
	});
	
});
