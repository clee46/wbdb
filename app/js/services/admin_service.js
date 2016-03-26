const handleSuccess = function(cb) {
  return (res) => {
    cb(null, res.data);
  };
};

const handleFailure = function(cb) {
  return (res) => {
    cb(res);
  };
};

module.exports = function(app) {
  app.factory('admin', ['$http', ($http) => {
    class Admin {
      constructor() {}

      getChallenges(cb) {
        $http.get(__BASEURL__ + '/api/admin/challenges')
          .then(handleSuccess(cb), handleFailure(cb));
      }

      getSolutions(cb) {
        $http.get(__BASEURL__ + '/api/admin/solutions')
          .then(handleSuccess(cb), handleFailure(cb));
      }

      getSolutionChallenge(id, cb) {
        $http.get(__BASEURL__ + `/api/solutions/${id}`)
          .then(handleSuccess(cb), handleFailure(cb));
      }


    }

    return new Admin();
  }]);
};
