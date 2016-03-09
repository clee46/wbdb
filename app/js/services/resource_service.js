const handleSuccess = (cb) => {
  return (res) => {
    cb(null, res.data);
  };
};

const handleFailure = (cb) => {
  return (res) => {
    cb(res);
  };
};

module.exports = (app) => {
  app.factory('Resource', ['$http', ($http) => {
    class Resource {
      constructor(resourceName) {
        this.resourceName = resourceName;
      }

      getOne(id, cb) {
        $http.get(__BASEURL__ + `/api${this.resourceName}/${id}`)
          .then(handleSuccess(cb), handleFailure(cb));
      }

      getAllWithId(data, cb) {
        this.getOne(data, cb);
      }

      getAll(cb) {
        $http.get(__BASEURL__ + `/api${this.resourceName}`)
          .then(handleSuccess(cb), handleFailure(cb));
      }

      create(data, cb) {
        $http.post(__BASEURL__ + `/api${this.resourceName}`, data)
          .then(handleSuccess(cb), handleFailure(cb));
      }

      update(data, cb) {
        $http.put(__BASEURL__ + `/api${this.resourceName}/${data._id}`,
          data)
            .then(handleSuccess(cb), handleFailure(cb));
      }

      delete(data, cb) {
        $http.delete(__BASEURL__ + '/api' + this.resourceName + '/' +
          data._id, data)
            .then(handleSuccess(cb), handleFailure(cb));
      }

    }

    return Resource;
  }]);
};
