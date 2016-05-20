'use strict';

describe('Controller: InfectionListCtrl', function () {

  // load the controller's module
  beforeEach(module('zssnApp'));

  var InfectionListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfectionListCtrl = $controller('InfectionListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InfectionListCtrl.awesomeThings.length).toBe(3);
  });
});
