/* eslint-env jasmine */

const { angular } = window;

describe('auth controller', () => {
  var $scope;
  var $controller;
  var $rootScope;
  var userService;
  var $location;
  var called;

  beforeEach(angular.mock.module('wbdbApp'));

  beforeEach(angular.mock.inject((_$rootScope_, _$controller_, _user_,
    _$location_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      userService = _user_;
      $location = _$location_;
      $scope = _$rootScope_.$new();
      called = 0;
  }));

  it('should be able to make a controller', () => {
    const authController = $controller('AuthController', {
      $rootScope,
      $scope,
      userService: null,
      $location: null
    });
    expect(typeof authController).toBe('object');
    expect($scope.signin).toBe(true);
    expect(typeof $scope.form).toBe('object');
  });

  it('should set login variables on success', () => {
    userService.login = (data, cb) => {
      called++;
      expect(data).toBe('test data');
      cb(null, {
        isAdmin: false
      });
    };

    $location.path = (newLocation) => {
      called++;
      expect(newLocation).toBe('/user');
    };

    $controller('AuthController', {
      $rootScope,
      $scope,
      userService,
      $location
    });
    $scope.login('test data');
    expect($rootScope.isAdmin).toBe(false);
    expect(called).toBe(2);
  });

  it('should set login variables on fail', () => {
    userService.login = (data, cb) => {
      called++;
      expect(data).toBe('test data');
      cb({ data: { msg: 'test error' } });
    };

    $controller('AuthController', {
      $rootScope,
      $scope,
      userService,
      $location
    });
    $scope.login('test data');
    expect($scope.responseLogin).toBe('test error');
    expect(called).toBe(1);
  });

  it('should set signup variables on success', () => {
    userService.createUser = (data, cb) => {
      called++;
      expect(data).toBe('test data');
      cb();
    };

    $location.path = (newLocation) => {
      called++;
      expect(newLocation).toBe('/user');
    };

    $controller('AuthController', {
      $rootScope,
      $scope,
      userService,
      $location
    });
    $scope.register('test data');
    expect($rootScope.isAdmin).toBe(false);
    expect(called).toBe(2);
  });
});
