'use strict';

describe('dyndns signup controller', function () {
	var $compile, scope, $exceptionHandler, $compileProvider, $q, auth, $controller, $httpBackend, domain, DyndnsSignupCtrl;

	beforeEach(module('desecClientApp'));

	beforeEach(module(function (_$compileProvider_) {
		$compileProvider = _$compileProvider_;
	}));

	beforeEach(module(function ($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode('log');
	}));

	beforeEach(inject(function (_$compile_, $rootScope, _$exceptionHandler_, _$q_, _$controller_, _auth_, _$httpBackend_, _domain_) {
		$compile = _$compile_;
		$exceptionHandler = _$exceptionHandler_;
		scope = $rootScope.$new();
		$q = _$q_;
		auth = _auth_;
		$controller = _$controller_;
		domain = _domain_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', 'texts/en.json').respond({});
		DyndnsSignupCtrl = $controller('DyndnsSignupCtrl', {'$scope': scope, auth: auth, domain: domain});
	}));

	afterEach(function () {
		if ($exceptionHandler.errors.length) {
			/* global dump */
			dump(jasmine.getEnv().currentSpec.getFullName());
			dump('$exceptionHandler has errors');
			dump($exceptionHandler.errors);
			expect($exceptionHandler.errors).toBe([]);
		}
	});

	describe('signup function', function() {

		describe('when successful', function() {
			
			beforeEach(function() {
				scope.email = 'shitman@desec.io';
				scope.domain = 'shitman';
				$httpBackend.expect('POST', '/api/v1/auth/users/create/')
					.respond(200, JSON.stringify({'email': 'shitman@desec.io'}));
				$httpBackend.expect('POST', '/api/v1/auth/token/create/')
					.respond(200, JSON.stringify({'auth_token': 'UnitTestAuthToken'}));
				$httpBackend.expect('POST', '/api/v1/domains/')
					.respond(200);
				scope.signup();
				$httpBackend.flush();
			});

			it('updates the scope correctly', function() {
				expect(scope.user.username).toBe('shitman@desec.io');
				expect(scope.loading).toBe(false);
				expect(scope.error).toBe('');
				expect(scope.success).toBeTruthy();
			});
			
		});

		describe('when user account registration fails', function() {
			
			beforeEach(function() {
				scope.email = 'alreadytaken@desec.io';
				scope.domain = 'doesntmatter';
				$httpBackend.expect('POST', '/api/v1/auth/users/create/')
					.respond(400);
				scope.signup();
				$httpBackend.flush();
			});
			
			function expectUnsuccessfulScope() {
				expect(scope.user.username).toBeUndefined();
				expect(scope.loading).toBeFalsy();
				expect(scope.error).not.toBe('');
				expect(scope.success).toBeFalsy();
			}
			
			it('updates the scope correctly', function() {
				expectUnsuccessfulScope();
			});
			
			it('attepts to re-register on the second call', function() {
				$httpBackend.expect('POST', '/api/v1/auth/users/create/')
					.respond(400);
				scope.signup();
				$httpBackend.flush();
				expectUnsuccessfulScope();
			});
			
		});
		
		describe('when user login fails', function() {
			
			// This should never happen ...
			// ;-)
			// Just in case it does, make sure our code behaves reasonable.
			
			beforeEach(function() {
				scope.email = 'alreadytaken@desec.io';
				scope.domain = 'doesntmatter';
				$httpBackend.expect('POST', '/api/v1/auth/users/create/')
					.respond(201);
				$httpBackend.expect('POST', '/api/v1/auth/token/create/')
					.respond(400);
				scope.signup();
				$httpBackend.flush();
			});

			it('shows an "unknown error" message', function() {
				expect(scope.loading).toBeFalsy();
				expect(scope.error).not.toBe('');
				expect(scope.error).toMatch(/unknown/i);
				expect(scope.success).toBeFalsy();
			});
			
		});
		
		describe('when domain registration fails', function() {
			
			beforeEach(function() {
				scope.email = 'alreadytaken@desec.io';
				scope.domain = 'doesntmatter';
				$httpBackend.expect('POST', '/api/v1/auth/users/create/')
					.respond(201);
				$httpBackend.expect('POST', '/api/v1/auth/token/create/')
					.respond(200, JSON.stringify({'auth_token': 'UnitTestAuthToken'}));
				$httpBackend.expect('POST', '/api/v1/domains/')
					.respond(400);
				scope.signup();
				$httpBackend.flush();
			});
			
			function expectHalfSuccessfulScope() {
				expect(scope.error).not.toBe('');
				expect(scope.user.username).not.toBeNull();
				expect(scope.loading).toBeFalsy();
				expect(scope.success).toBeFalsy();
			}
			
			it('updates scope correctly', function() {
				expectHalfSuccessfulScope();
			});
			
			it('tries registering the domain on the next call', function() {
				$httpBackend.expect('POST', '/api/v1/domains/')
					.respond(400);
				scope.signup();
				$httpBackend.flush();
				expectHalfSuccessfulScope();
			});
			
			it('updates the scope to successful after an successful registration attempt', function() {
				$httpBackend.expect('POST', '/api/v1/domains/')
					.respond(201);
				scope.signup();
				$httpBackend.flush();

				expect(scope.error).toBe('');
				expect(scope.user.username).not.toBeNull();
				expect(scope.loading).toBeFalsy();
				expect(scope.success).toBeTruthy();
			});
			
		});

	});

});
