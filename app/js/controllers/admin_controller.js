module.exports = function(app) {
  app.controller('AdminController', ['$scope', '$http', 'Resource', '$location',
    '$timeout', ($scope, $http, Resource, $location, $timeout) => {
      console.log('AdminController loaded');
      $scope.adminService = new Resource('/admin');
      $scope.queue = [];

      $scope.getQueue = function() {
        console.log('Getting pending challenges');
        $scope.adminService.getAll((err, res) => {
          // if (err) return console.log(err);
          if (err.statusText === 'Unauthorized') {
            //  $location.path('/auth');
            $timeout(() => {
                $location.path('/auth');
            });
            return console.log('err /admin');
          }
          $scope.queue = res;
        });
      };
  }]);
};
