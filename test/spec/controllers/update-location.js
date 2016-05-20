'use strict';

describe('Controller: UpdateLocationCtrl', function () {

  // load the controller's module
  beforeEach(module('zssnApp'));

  var UpdateLocationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateLocationCtrl = $controller('UpdateLocationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UpdateLocationCtrl.awesomeThings.length).toBe(3);
  });
});
