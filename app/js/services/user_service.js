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
  app.factory('user', ['$http', ($http) => {
    class User {
      constructor() {}

      createUser(user, cb) {
        console.log(user);
        $http.post(__BASEURL__ + '/api/signup', user)
          .then(handleSuccess(cb), handleFailure(cb));
      }

      login(user, cb) {
        $http({
          method: 'GET',
          url: __BASEURL__ + '/api/signin',
          headers: {
            'Authorization': `Basic ${btoa(user.email + ':' + user.password)}`
          }
        })
          .then(handleSuccess(cb), handleFailure(cb));
      }

      getUser(cb) {
        cb = cb || function() {};
        $http.get(__BASEURL__ + '/api/currentuser')
          .then(handleSuccess(cb), handleFailure(cb));
      }
    }

    return new User();
  }]);
};
