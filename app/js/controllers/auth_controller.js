module.exports = function(app) {
  app.controller('AuthController', ['$rootScope', '$scope', 'user',
    '$location', ($rootScope, $scope, userService, $location) => {
      $scope.signin = true;
      $scope.form = {};
      $rootScope.loginPage = true;

      $scope.login = (user) => {
        $scope.responseLogin = null;
        userService.login(user, (err, res) => {
          if (err) {
            $scope.responseLogin = err.data.msg;
            return console.log(err.data.msg);
          }
          $rootScope.loggedIn = true;
          if (res.isAdmin) {
            $rootScope.isAdmin = true;
            $location.path('/admin');
          } else {
            $rootScope.isAdmin = false;
            $location.path('/user');
          }
        });
      };

      $scope.register = (user) => {
        $scope.responseRegister = null;
        userService.createUser(user, (err) => {
          if (err) {
            $scope.responseRegister = err.data.msg;
            return console.log(err.data.msg);
          }
          $rootScope.loggedIn = true;
          $rootScope.isAdmin = false;
          $location.path('/user');
        });
      };

    }]);
};
