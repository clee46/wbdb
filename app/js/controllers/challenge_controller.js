module.exports = function(app) {
  app.controller('ChallengeController', ['$rootScope', '$scope', '$location', '$http', 'Resource',
    '$stateParams', 'auth', ($rootScope, $scope, $location, $http, Resource, $stateParams, auth) => {
      $scope.solutions = [];
      $scope.hints = [];
      $scope.tags = [];
      $scope.showSolutions = false;

      $scope.challengeService = new Resource('/challenges');
      $scope.favoriteService = new Resource('/favorites');
      $scope.hintService = new Resource('/hints');
      $scope.tagService = new Resource('/tags');
      $scope.solutionService = new Resource('/solutions');

      $scope.currId = auth.getUserId();

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

      $scope.publish = function() {
        $scope.challengeService.update({
          _id: $scope.challenge._id,
          published: true
        }, (err) => {
          if (err) return console.log(err);
          $location.path('/admin');
        });
      };

      $scope.addFavorite = function() {
        $scope.showAdd = !$scope.showAdd;

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

      $scope.getAllSolutions = function() {
        // $scope.hints.push(challenge.hints[i]);
        $scope.solutionService.getAllWithId($scope.challenge._id,
          (err, res) => {
            if (err) return console.log(err);
            $scope.solutions = res;
            if ($scope.solutions.length === 0) {
              console.log('Sorry, no solutions!');
            } else {
              $scope.showSolutions = true;
            }
          });
      };

      $scope.hideButton = function() {
        $scope.showSolutions = false;
      };

      $scope.getAllHints = function() {
        $scope.hintService.getAllWithId($scope.challenge._id,
          (err, res) => {
            if (err) return console.log(err);
            $scope.hints = res;
          });
      };

      $scope.getAllTags = function() {
        $scope.tagService.getAllWithId($scope.challenge._id,
          (err, res) => {
            if (err) return console.log(err);
            $scope.tags = res;
          });
      };

      $scope.addSolution = function() {

      };
  }]);
};
