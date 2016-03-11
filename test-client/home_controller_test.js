/* eslint-env jasmine */

const { angular } = window;

describe('home controller', () => {
  var $scope;
  var $controller;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('wbdbApp'));

  beforeEach(angular.mock.inject((_$rootScope_, _$controller_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
  }));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to make a controller', () => {
    const homeController = $controller('HomeController',
      { $rootScope, $scope });
    expect(typeof homeController).toBe('object');
    expect($rootScope.loginPage).toBe(false);
    expect(Array.isArray($scope.published)).toBe(true);
  });

  it('should be able to get published challenges', () => {
    $controller('HomeController', { $rootScope, $scope });
    $httpBackend.expectGET('http://localhost:3000/api/published')
      .respond(200, [{ title: 'test challenge' }]);
    $scope.getPublished();
    $httpBackend.flush();
    expect($scope.published.length).toBe(1);
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
