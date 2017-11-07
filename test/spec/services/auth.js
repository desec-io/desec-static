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

	var userBefore;
	var usernameBefore;

	beforeEach(function() {
		userBefore = auth.user;
		usernameBefore = auth.user.username;
	});

	afterEach(function() {
		expect(auth.user).toBe(userBefore);
	});
	
	describe('register function', function() {

		afterEach(function() {
			expect(auth.user.username).toBe(usernameBefore);
		});
		
		it('POSTs the email address and password to /api/v1/auth/users/create/', function() {
			$httpBackend.expect('POST', '/api/v1/auth/users/create/', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(201, '{"email":"shitman@desec.io"}');
			auth.register('shitman@desec.io', 'shit');
			$httpBackend.flush();
		});

		it('resolves the returned promise when successfully registered', function() {
			$httpBackend.expect('POST', '/api/v1/auth/users/create/', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			var result = 0;
			auth.register('shitman@desec.io', 'shit').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
		});

		it('rejects the returned promise when registration fails', function() {
			$httpBackend.expect('POST', '/api/v1/auth/users/create/', {'email':'shitman@desec.io', 'password':'shit'})
				.respond(400);
			var result = 0;
			auth.register('shitman@desec.io', 'shit').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(2);
		});
		
	});
	
	describe('login function', function() {

		beforeEach(function() {
			expect(auth.user.username).toBeUndefined();
		});
		
		it('POSTs the credentials to /api/v1/auth/token/create/', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/create/', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
		});
		
		it('sets the received auth token to be used with $http', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/create/', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
			expect($http.defaults.headers.common.Authorization).toBe('Token ThisIsATestAuthToken');
		});
		
		it('resolves the returned promise when successfully logged in', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/create/', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			var result = 0;
			auth.login('johndoe@desec.io', 'john').then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
			expect(auth.user.username).toBe('johndoe@desec.io');
		});

		it('rejects the returned promise when login fails', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/create/', {'email':'johndoe@desec.io', 'password':'john'})
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
			$httpBackend.expect('POST', '/api/v1/auth/token/create/', {'email':'johndoe@desec.io', 'password':'john'})
				.respond(200, '{"auth_token":"ThisIsATestAuthToken"}');
			auth.login('johndoe@desec.io', 'john');
			$httpBackend.flush();
		});

		it('POSTs to /api/v1/auth/token/destroy/', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/destroy/').respond(200);
			auth.logout();
			$httpBackend.flush();
		});

		it('clears auth token to be used with $http', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/destroy/').respond(200);
			auth.logout();
			$httpBackend.flush();
			expect($http.defaults.headers.common.Authorization).toBe('');
		});

		it('resolves the returned promise when successfully logged out', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/destroy/').respond(200);
			var result = 0;
			auth.logout().then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(1);
			expect(auth.user.username).toBeUndefined();
		});

		it('rejects the returned promise when logout fails', function() {
			$httpBackend.expect('POST', '/api/v1/auth/token/destroy/').respond(400);
			var result = 0;
			auth.logout().then(function() { result = 1; }, function() { result = 2; });
			$httpBackend.flush();
			expect(result).toBe(2);
		});
		
	});
	
	describe('user object', function() {

		it('throws when overwriting user object', function() {
			expect(function() {
				auth.user = { username: undefined };
			}).toThrow();
		});

		it('throws when overwriting user name', function() {
			expect(function() {
				auth.user.username = "damnit";
			}).toThrow();
		});

	});

});
