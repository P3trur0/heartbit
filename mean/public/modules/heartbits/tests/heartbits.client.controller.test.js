'use strict';

(function() {
	// Heartbits Controller Spec
	describe('Heartbits Controller Tests', function() {
		// Initialize global variables
		var HeartbitsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Heartbits controller.
			HeartbitsController = $controller('HeartbitsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Heartbit object fetched from XHR', inject(function(Heartbits) {
			// Create sample Heartbit using the Heartbits service
			var sampleHeartbit = new Heartbits({
				name: 'New Heartbit'
			});

			// Create a sample Heartbits array that includes the new Heartbit
			var sampleHeartbits = [sampleHeartbit];

			// Set GET response
			$httpBackend.expectGET('heartbits').respond(sampleHeartbits);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.heartbits).toEqualData(sampleHeartbits);
		}));

		it('$scope.findOne() should create an array with one Heartbit object fetched from XHR using a heartbitId URL parameter', inject(function(Heartbits) {
			// Define a sample Heartbit object
			var sampleHeartbit = new Heartbits({
				name: 'New Heartbit'
			});

			// Set the URL parameter
			$stateParams.heartbitId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/heartbits\/([0-9a-fA-F]{24})$/).respond(sampleHeartbit);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.heartbit).toEqualData(sampleHeartbit);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Heartbits) {
			// Create a sample Heartbit object
			var sampleHeartbitPostData = new Heartbits({
				name: 'New Heartbit'
			});

			// Create a sample Heartbit response
			var sampleHeartbitResponse = new Heartbits({
				_id: '525cf20451979dea2c000001',
				name: 'New Heartbit'
			});

			// Fixture mock form input values
			scope.name = 'New Heartbit';

			// Set POST response
			$httpBackend.expectPOST('heartbits', sampleHeartbitPostData).respond(sampleHeartbitResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Heartbit was created
			expect($location.path()).toBe('/heartbits/' + sampleHeartbitResponse._id);
		}));

		it('$scope.update() should update a valid Heartbit', inject(function(Heartbits) {
			// Define a sample Heartbit put data
			var sampleHeartbitPutData = new Heartbits({
				_id: '525cf20451979dea2c000001',
				name: 'New Heartbit'
			});

			// Mock Heartbit in scope
			scope.heartbit = sampleHeartbitPutData;

			// Set PUT response
			$httpBackend.expectPUT(/heartbits\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/heartbits/' + sampleHeartbitPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid heartbitId and remove the Heartbit from the scope', inject(function(Heartbits) {
			// Create new Heartbit object
			var sampleHeartbit = new Heartbits({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Heartbits array and include the Heartbit
			scope.heartbits = [sampleHeartbit];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/heartbits\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleHeartbit);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.heartbits.length).toBe(0);
		}));
	});
}());