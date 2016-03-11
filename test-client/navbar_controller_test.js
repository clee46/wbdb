/* eslint-env jasmine */

const { angular } = window;

describe('navbar controller', () => {
  var $scope;
  var $controller;
  var $rootScope;

  beforeEach(angular.mock.module('wbdbApp'));

  beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
  }));

  it('should be able to make a controller', () => {
    const navController = $controller('NavController',
      { $rootScope, $scope });
    expect(typeof navController).toBe('object');
    expect($rootScope.loginPage).toBe(false);
  });
});
