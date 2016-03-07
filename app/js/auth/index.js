// This auth scheme is inspired by the angular auth tutorial at
// https://thinkster.io/angularjs-jwt-auth

const authSvc = require('./auth_service');
const interceptor = require('./interceptor');
const directive = require('./directive');
const userSvc = require('./user_service');

module.exports = (app, API) => {
  authSvc(app);
  userSvc(app);
  interceptor(app, API);
  directive(app);
};
