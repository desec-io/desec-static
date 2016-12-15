'use strict';

describe('auth service', function () {
	var $exceptionHandler, $httpBackend, domain;

	beforeEach(module('desecClientApp'));

	beforeEach(module(function ($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode('log');
	}));

	beforeEach(inject(function (_$exceptionHandler_, _$httpBackend_, _domain_) {
		$exceptionHandler = _$exceptionHandler_;
		$httpBackend = _$httpBackend_;
		domain = _domain_;
		_$httpBackend_.when('GET', 'texts/en.json').respond({});
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

	describe('domain resource', function() {

		it('POSTs to /api/v1/domains/ if created', function() {
			var values = {
				'name': 'test.dedyn.io',
				'dyn': true
			};
			var resp_values = angular.copy(values);
			resp_values['id'] = 1337;
			$httpBackend.expect('POST', '/api/v1/domains/', values)
				.respond(201, resp_values);
			var d = new domain(values);
			d.$post();
			$httpBackend.flush();
		});

		it('GETs /api/v1/domains/@id when asking for specific id', function() {
			$httpBackend.expect('GET', '/api/v1/domains/4711/')
				.respond(200, JSON.stringify({'name': 'koellsch.dedyn.io', 'id': 4711}));
			domain.get({'id': 4711});
			$httpBackend.flush();
		});
		
		describe('after retrieving a domain', function() {
			
			var d;
			
			beforeEach(function() {
				$httpBackend.expect('GET', '/api/v1/domains/4711/')
					.respond(200, JSON.stringify({'name': 'koellsch.dedyn.io', 'id': 4711}));
				d = domain.get({'id': 4711});
				$httpBackend.flush();
			});
			
			it('can PUT the domain', function() {
				$httpBackend.expect('PUT', '/api/v1/domains/4711/')
					.respond(200, JSON.stringify({'name': 'koellsch.dedyn.io', 'id': 4711, a: '10.1.2.3'}));
				d.a = '10.1.2.3';
				d.$update();
				$httpBackend.flush();
			});
			
			it('can DELETE the domain', function() {
				$httpBackend.expect('DELETE', '/api/v1/domains/4711/')
					.respond(200);
				d.$delete();
				$httpBackend.flush();
			});
			
		});
		
	});

});
