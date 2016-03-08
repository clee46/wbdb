module.exports = function(app) {
  app.controller('NavController', ['$scope', 'auth', '$rootScope',
    function($scope, auth, $rootScope) {
      $scope.logout = auth.logout.bind(auth, () => $rootScope.loggedIn = false);
  }]);
};
