const angular = require('angular');
// const highlight = require('angular-highlightjs');

require('angular-ui-router');
require('angular-aria');
const wbdbApp = angular.module('wbdbApp', ['ui.router', 'ngAria']);

require('./controllers')(wbdbApp);
require('./services')(wbdbApp, __BASEURL__);
// require('./home')(wbdbApp);


wbdbApp.config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/fourohfour');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home_view.html',
        controller: 'HomeController'
      })
      .state('challenge', {
        url: '/challenge/:id',
        templateUrl: 'views/challenge_view.html',
        controller: 'ChallengeController',
        params: { challengeData: null, id: { value: null, squash: false } }
      })
      .state('auth', {
        url: '/auth',
        templateUrl: 'views/auth_view.html',
        controller: 'AuthController'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'views/user_view.html',
        controller: 'UserController'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin_view.html',
        controller: 'AdminController'
      })
      .state('fourohfour', {
        url: '/fourohfour',
        templateUrl: 'views/fourohfour.html'
      });
}]);
