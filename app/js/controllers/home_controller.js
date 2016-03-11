module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$http',
    function($rootScope, $scope, $http) {
      $scope.search = '';
      $scope.published = [];
      $rootScope.loginPage = false;
      $scope.getPublished = function() {
        $http.get(__BASEURL__ + '/api/published')
          .then((res) => {
            $scope.published = res.data;
          }, (err) => {
            console.log(err);
          });
      };
  }]);
};
