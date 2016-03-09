module.exports = function(app) {
  app.controller('AuthController', ['$rootScope', '$scope', 'user',
    '$location', ($rootScope, $scope, userService, $location) => {
      $scope.signin = true;
      $scope.form = {};
      $scope.login = (user) => {
        userService.login(user, (err, res) => {
          if (err) return console.log(err.data.msg);
          console.log(res);
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
        userService.createUser(user, (err) => {
          if (err) return console.log(err.data.msg);
          $rootScope.loggedIn = true;
          $location.path('/user');
        });
      };
    }]);
};
