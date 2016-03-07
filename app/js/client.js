const angular = require('angular');
const uiRouter = require('angular-ui-router');

const wbdbApp = angular.module('wbdbApp', ['ui.router']);
const HomeController = require('./controllers/home_controller.js')(wbdbApp);
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
      });
}]);
