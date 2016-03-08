module.exports = function(app) {
  app.controller('HomeController', ['$scope', '$http', 'Resource',
    function($scope, $http, Resource) {
      $scope.search = '';
      $scope.challenges = [];
      $scope.challengeService = new Resource('/challenges');
      $scope.getAllChallenges = function() {
        $scope.challengeService.getAll((err, res) => {
          if (err) return console.log(err);
          $scope.challenges = res;
        });
      };
  }]);
};
