'use strict';

describe('donation controller', function () {
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
		DyndnsSignupCtrl = $controller('DonationCtrl', {'$scope': scope, auth: auth, domain: domain});
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

	describe('donation function', function() {

		describe('when successful', function() {
			
			beforeEach(function() {
				scope.d = {
					name: 'Shit Man',
					iban: 'SM13370000004711000',
					bic: 'GENOYYXXX',
					amount: 42.42,
					message: '',
					email: '',
				};
				$httpBackend.expect('POST', '/api/donation/')
					.respond(200, JSON.stringify(scope.d));
				scope.donate();
				$httpBackend.flush();
			});

			it('updates the scope correctly', function() {
				expect(scope.loading).toBe(false);
				expect(scope.error).toBe('');
				expect(scope.success).toBeTruthy();
			});
			
		});

		describe('when unsuccessful', function() {
			
			beforeEach(function() {
				scope.d = {
					name: 'Shit Man',
					iban: 'SM13370000004711000',
					bic: 'GENOYYXXX',
					amount: 42.42,
					message: '',
					email: '',
				};
				$httpBackend.expect('POST', '/api/donation/')
					.respond(400, JSON.stringify({}));
				scope.donate();
				$httpBackend.flush();
			});
			
			it('updates the scope correctly', function() {
				expect(scope.loading).toBeFalsy();
				expect(scope.error).not.toBe('');
				expect(scope.success).toBeFalsy();
			});
			
		});
		
	});

});
