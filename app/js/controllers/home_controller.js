module.exports = function(app) {
  // app.controller('HomeController', ['$scope', '$http', 'Resource', '$window',
  // 'auth', ($scope, $http, Resource, $window, auth) => {
  //     $scope.search = '';
  //     $scope.challenges = [];
  //     $window.localStorage.removeItem('jwtToken');
  //     $scope.challengeService = new Resource('/challenges');
  //     auth.token = null;
  //     $scope.getAllChallenges = function() {
  //       $scope.challengeService.getAll((err, res) => {
  //         if (err) {
  //           return console.log(err);
  //         }
  //         $scope.challenges = res;
  //       });
  app.controller('HomeController', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
      $scope.search = '';
      $scope.published = [];
      $scope.tags = [];
      $rootScope.loginPage = false;
      $scope.getPublished = function() {
        $http.get(__BASEURL__ + '/api/published')
          .then((res) => {
            console.log(res);
            $scope.published = res.data;
          }, (err) => {
            console.log(err);
          });
      };
  }]);
};
