//we need to add code to handle  if a user visits the view directly through an external link

module.exports = function(app) {
  app.controller('ChallengeController', ['$scope', '$http', 'Resource', '$stateParams',
    function($scope, $http, Resource, $stateParams) {
      $scope.challenge = $stateParams.challengeData;
  }]);
};
