'use strict';

describe('dyndns signup controller', function () {
	var $compile, scope, $exceptionHandler, $compileProvider, $q, auth, $controller, $httpBackend, domain, DyndnsCheckCtrl;

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
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', 'texts/en.json').respond({});
		var mockStateParams = {
			domain: 'foobar.dedyn.io'
		};
		DyndnsCheckCtrl = $controller('DyndnsCheckCtrl', {'$scope': scope, '$stateParams': mockStateParams});
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

	describe('check function', function() {

		describe('when successful', function () {

			beforeEach(function () {
				$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io')
					.respond(200, JSON.stringify({'a': ['10.1.2.3'], 'aaaa': []}));
				$httpBackend.flush();
			});

			it('updates the scope correctly', function () {
				expect(scope.domain.a).toContain('10.1.2.3');
				expect(scope.loading).toBe(false);
				expect(scope.ipaddr).toBe('10.1.2.3');
				expect(scope.domainname).toBe('foobar.dedyn.io');
			});

		});

		describe('when unsuccessful', function () {

			beforeEach(function () {
				$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io')
					.respond(200, JSON.stringify({'a': [], 'aaaa': []}));
				$httpBackend.flush();
			});

			it('updates the scope correctly', function () {
				expect(scope.domain.a).toEqual([]);
				expect(scope.loading).toBe(false);
				expect(scope.ipaddr).toBe('');
				expect(scope.domainname).toBe('foobar.dedyn.io');
			});

		});
		
		it('checks again when check() is called', function() {
			// once when controller is initiated
			$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io').respond(400);
			// once when we call check()
			$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io').respond(400);
			scope.check();
			$httpBackend.flush();
		});
		
		it('handles ipv6-only hosts successfully', function() {
			$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io')
				.respond(200, JSON.stringify({'a': [], 'aaaa': ['::1']}));
			$httpBackend.flush();
			expect(scope.ipaddr).toBe('::1');
		});
		
		it('shows both addresses for dual-ip hosts', function() {
			$httpBackend.expect('GET', '/api/v1/dns?domain=foobar.dedyn.io')
				.respond(200, JSON.stringify({'a': ['10.1.2.3'], 'aaaa': ['::1']}));
			$httpBackend.flush();
			expect(scope.ipaddr).toMatch(/10\.1\.2\.3/);
			expect(scope.ipaddr).toMatch(/::1/);
		});

	});

});
