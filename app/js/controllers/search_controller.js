module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$location', '$http',
    '$stateParams', ($scope, $location, $http, $stateParams) => {

      $scope.solutions = [];
      $scope.challenges = [];

      $scope.username = $stateParams.id;

      $scope.redirect = function(id) {
        $location.path('/challenge/' + id);
      };

      $scope.getUserChallenges = function() {

        if (!$scope.username) $scope.username = $stateParams.id;

        else {
          $http.get(__BASEURL__ + '/api/userchallenges/' + $scope.username)
            .then((res) => {
              $scope.challenges = res.data;
            }, (err) => {
              if (err) return console.log(err);
            });
        }

      };

      $scope.getUserSolutions = function() {

        if (!$scope.username) $scope.username = $stateParams.id;

        else {
          $http.get(__BASEURL__ + '/api/usersolutions/' + $scope.username)
            .then((res) => {
              $scope.solutions = res.data;
            }, (err) => {
              if (err) return console.log(err);
            });
        }

      };


  }]);
};
