const angular = require('angular');

// need to discuss which router to use
require('angular-route');
require('angular-ui-router');
const wbdbApp = angular.module('wbdbApp', ['ngRoute', 'ui.router']);

require('./services')(wbdbApp);
require('./challenges')(wbdbApp);
// require('./auth')(wbdbApp);
