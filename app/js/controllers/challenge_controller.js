
// we need to add code to handle if a user visits the view
// directly through an external link

module.exports = function(app) {
  app.controller('ChallengeController', ['$scope', '$http', 'Resource',
    '$stateParams', 'auth', ($scope, $http, Resource, $stateParams, auth) => {
      $scope.challengeService = new Resource('/challenges');
      $scope.favoriteService = new Resource('/favorites');
      $scope.hintService = new Resource('/hints');
      $scope.tagService = new Resource('/tags');
      $scope.solutionService = new Resource('/solutions');

      $scope.currId = auth.getUserId();
      $scope.hints = [];

      $scope.challenge = $stateParams.challengeData;
      if (!$scope.challenge) {
        $scope.challengeService.getOne($stateParams.id, (err, data) => {
          if (err) return console.log(err);
          $scope.challenge = data;
        });
      }

      // check which button to show (either add/remove favorite); run on load
      $scope.checkFavoritedOrNot = (function() {
        $scope.showAdd = true;
        $scope.favoriteService.getAll((err, res) => {
          if (err) return console.log(err);
          for (var i = 0; i < res.length; i++) {
            // check if user already favorited this challenge
            if ($scope.challenge._id === res[i]._id) {
              $scope.showAdd = false;
              break;
            }
          }
        });
      })();

      $scope.addFavorite = function() {
        $scope.showAdd = !$scope.showAdd;

        console.log($scope.currId);
        $scope.favoriteService
          .create({
            challengeId: $scope.challenge._id,
            userId: $scope.currId
          }, (err) => {
             if (err) console.log(err);
          });
      };

      $scope.removeFavorite = function() {
        $scope.showAdd = !$scope.showAdd;
        $scope.favoriteService
          .delete($scope.challenge, (err) => {
          if (err) return console.log(err);
        });
      };

      $scope.getNewHint = function() {
        // $scope.hints.push(challenge.hints[i]);
      };

      $scope.getNewSolution = function() {
        // $scope.hints.push(challenge.hints[i]);
      };

      $scope.getAllSolutions = function() {
        // $scope.hints.push(challenge.hints[i]);
      };

      $scope.getAllHints = function() {
        // $scope.hints.push(challenge.hints[i]);
      };

      $scope.getAllTags = function() {
        // $scope.hints.push(challenge.hints[i]);
      };





      $scope.addSolution = function() {

      };
      $scope.addHint = function() {

      };
      $scope.addTag = function() {

      };


  }]);
};
