var angular = require('angular');

module.exports = function(app) {
  app.controller('ChallengesController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    $scope.challenges = [];
    $scope.challengeService = new Resource('/challenges');
     $scope.getAllChallenges = function() {
      challengeService.getAll(function(err, res) {
        if(err) return console.log(err);
        $scope.challenges = res;
      });
    };
  }]);
};
