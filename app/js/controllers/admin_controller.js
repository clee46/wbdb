module.exports = function(app) {
  app.controller('AdminController', ['$scope', '$http', 'Resource', '$location',
    '$timeout', 'admin',($scope, $http, Resource, $location, $timeout, admin) => {
      $scope.challengesQueue = [];
      $scope.solutionsQueue = [];
      $scope.solutionService = new Resource('/solutions');

      $scope.getChallengesQueue = function() {
        admin.getChallenges((err, res) => {
          // if (err) return console.log(err);
          if (err && err.statusText === 'Unauthorized') {
            //  $location.path('/auth');
            $timeout(() => {
                $location.path('/auth');
            });
            return console.log('err /admin');
          }
          $scope.challengesQueue = res;
        });
      };

      $scope.getSolutionsQueue = function() {
        admin.getSolutions((err, res) => {
          // if (err) return console.log(err);
          if (err && err.statusText === 'Unauthorized') {
            //  $location.path('/auth');
            $timeout(() => {
                $location.path('/auth');
            });
            return console.log('err /admin');
          }
          $scope.solutionsQueue = res;


          $scope.solutionsQueue.map((solution) => {
            admin.getSolutionChallenge(solution.challengeId, (err, res) => {
              if (err) return console.log(err);
              console.log(res);
              solution.challenge = res;
            });
          });


        });
      };


      $scope.publishSolution = function(solution) {
        console.log(solution);
        solution.published = true;
        $scope.solutionService.update(solution, (err) => {
          if (err) return console.log(err);
          $scope.getSolutionsQueue();
        });
      };


  }]);
};
