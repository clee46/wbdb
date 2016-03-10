module.exports = function(app) {
  app.controller('HomeController', ['$scope', '$http', 'Resource', '$window', 'auth',
    function($scope, $http, Resource, $window, auth) {
      $scope.search = '';
      $scope.challenges = [];
      $window.localStorage.removeItem('jwtToken');
      $scope.challengeService = new Resource('/challenges');
      auth.token = null;
      $scope.getAllChallenges = function() {
        $scope.challengeService.getAll((err, res) => {
          if (err) {
            return console.log(err);
          }
          $scope.challenges = res;
        });
      };
  }]);
};
