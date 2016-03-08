module.exports = function(app) {
  app.controller('AuthController', ['$scope', 'auth', 'user', '$location', ($scope, auth, userService, $location) => {
    $scope.auth = auth;
    $scope.loggedIn = !!auth.token;
    $scope.signup = false;
    $scope.signin = false;
    $scope.form = {};
    $scope.logout = auth.logout.bind(auth, () => $scope.loggedIn = false);
    $scope.toggleSignup = () => {
      $scope.signup = true;
      $scope.signin = false;
    };
    $scope.toggleSignin = () => {
      $scope.signin = true;
      $scope.signup = false;
    };
    $scope.login = (user) => {
      userService.login(user, (err, res) => {
        if (err) return console.log(err.data.msg);
        console.log(res);
        $location.path('/user');
      });
    };
    $scope.register = (user) => {
      userService.createUser(user, (err) => {
        if (err) return console.log(err.data.msg);
        $location.path('/user');
      });
    };
  }]);
};
