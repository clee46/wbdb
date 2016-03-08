module.exports = function(app) {
  app.controller('UserController', ['$scope', '$http', 'Resource', '$stateParams',
    function($scope, $http, Resource, $stateParams) {
      $scope.myChallenges = [];
      $scope.favorites = [];
      $scope.newPost = {}
      $scope.challengeService = new Resource('/challenges');
      $scope.favoriteService = new Resource('/favorites');

      $scope.submitChallenge = function() {
        // Set the current date and time
        var currentDate = new Date();
        var options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        $scope.newPost.createdOn = currentDate.toLocaleTimeString('en-us', options);

        // Send newPost to the DB
        $scope.challengeService.create($scope.newPost, (err, res) => {
          if (err) return console.log(err);
        });
      }
      $scope.getAllFavorites = function() {
        $scope.favoriteService.getAll((err, res) => {
          if (err) return console.log(err);
          $scope.favorites = res;
        });
      };
      $scope.getUserChallenges = function() {
        $http.get('http://localhost:3000/api/mychallenges')
          .then((res) => {
            console.log(res);
            $scope.myChallenges = res.data;
          }, (err) => {
            console.log(err);
          });
      };
  }]);
};
