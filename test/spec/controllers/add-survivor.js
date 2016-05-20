'use strict';

describe('Controller: AddSurvivorCtrl', function () {

  // load the controller's module
  beforeEach(module('zssnApp'));

  var AddSurvivorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddSurvivorCtrl = $controller('AddSurvivorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddSurvivorCtrl.awesomeThings.length).toBe(3);
  });
});
