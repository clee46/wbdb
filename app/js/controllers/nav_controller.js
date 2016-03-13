module.exports = function(app) {
  app.controller('NavController', ['$scope', 'auth', 'user', '$rootScope',
  '$location', ($scope, auth, user, $rootScope, $location) => {
      $scope.auth = auth;
      $scope.location = $location;

      $rootScope.loginPage = false;
      $rootScope.isAdmin = false;

      if (auth.token) {
        user.getUser((err, res) => {
          if (err) return console.log(err);
          if (res.authentication.isAdmin) $rootScope.isAdmin = true;
        });
      }

      $rootScope.loggedIn = !!auth.token;

      $scope.logout = auth.logout.bind(auth, () => {
        $rootScope.loggedIn = false;
        $rootScope.loginPage = false;
      });
  }]);
};
