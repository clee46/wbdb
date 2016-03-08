
// we need to add code to handle if a user visits the view
// directly through an external link

module.exports = function(app) {
  app.controller('ChallengeController', ['$scope', '$http', 'Resource',
    '$stateParams', ($scope, $http, Resource, $stateParams) => {
      $scope.challenge = $stateParams.challengeData;
      $scope.hints = [];
      $scope.favoriteService = new Resource('/favorites');
      $scope.showAdd = true;

      $scope.addFavorite = function() {
        $scope.favoriteService
          .create({
            challengeId: challenge._id,
            userId: user._id
          }, (err, res) => {
              if (err) return console.log(err);
          });
      };

      $scope.removeFavorite = function() {
        $scope.favoriteService
          .delete({
            challengeId: challenge._id,
            userId: user._id
          }, (err, res) => {
          if (err) return console.log(err);
        });
      };

      $scope.getNewHint = function() {
        // $scope.hints.push(challenge.hints[i]);
      };

  }]);
};
