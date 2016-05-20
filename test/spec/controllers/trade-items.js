'use strict';

describe('Controller: TradeItemsCtrl', function () {

  // load the controller's module
  beforeEach(module('zssnApp'));

  var TradeItemsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TradeItemsCtrl = $controller('TradeItemsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TradeItemsCtrl.awesomeThings.length).toBe(3);
  });
});
