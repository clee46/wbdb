module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$location', '$http',
    '$stateParams', ($scope, $location, $http, $stateParams) => {

      $scope.searchResults = [];
      $scope.username = $stateParams.id;

      $scope.redirect = function(id) {
        $location.path('/challenge/' + id);
      };

      $scope.getUserChallenges = function() {

        if (!$scope.username) $scope.username = $stateParams.id;

        else {
          $http.get(__BASEURL__ + '/api/userchallenges/' + $scope.username)
            .then((res) => {
              $scope.searchResults = res.data;
            }, (err) => {
              if (err) return console.log(err);
            });
        }

      };

  }]);
};
