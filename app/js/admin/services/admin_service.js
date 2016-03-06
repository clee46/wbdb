module.exports = exports = function(app) {
  app.factory('adminService', ['$http', function($http) {
    // NEEDS TO DO THE FOLLOWING:
    // #1 $http GET request to server to retrieve unpublished challenges from database
    // #2 $http PUT request to publish a submitted challenge
    // #3 $http DELETE request to reject a submitted challenge
    // OTHERS??
  }]);
};
