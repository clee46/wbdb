const angular = require('angular');
const highlight = require('angular-highlightjs');

const wbdbApp = angular.module('wbdbApp', ['ui.router', 'hljs']);
require('angular-ui-router');

require('./controllers/home_controller.js')(wbdbApp);
require('./controllers/challenge_controller.js')(wbdbApp);
require('./services')(wbdbApp);
// require('./home')(wbdbApp);


wbdbApp.config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
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
      });
}]);
