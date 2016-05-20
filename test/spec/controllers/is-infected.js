'use strict';

describe('Controller: IsInfectedCtrl', function () {

  // load the controller's module
  beforeEach(module('zssnApp'));

  var IsInfectedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IsInfectedCtrl = $controller('IsInfectedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IsInfectedCtrl.awesomeThings.length).toBe(3);
  });
});
