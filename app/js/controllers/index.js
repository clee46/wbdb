// This auth scheme is inspired by the angular auth tutorial at
// https://thinkster.io/angularjs-jwt-auth

module.exports = (app) => {
  require('./auth_controller')(app);
  require('./challenge_controller')(app);
  require('./home_controller')(app);
  require('./user_controller')(app);
  require('./admin_controller')(app);
};
