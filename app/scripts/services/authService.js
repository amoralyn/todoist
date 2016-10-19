angular.module('dooeet')
  .service('AuthService', function($http, $q, $window) {
    let response = {};
    response.login = function(data) {
      let defer = $q.defer();
      $http.post('/api/users/login', data).success(function(res) {
        defer.resolve(res);
      }).error(function(err) {
        console.log(err);
      })

      return defer.promise;
    }
    response.register = function(data) {
      let defer = $q.defer();
      $http.post('/api/users', data).success(function(res) {
        defer.resolve(res);
      }).error(function(err) {
        console.log(err);
      })
      return defer.promise;
    }

    response.logout = function() {
      $window.localStorage.removeItem('user');
    }

    response.userExist = function() {
      let token = $window.localStorage.getItem('token');
      if (!token) {
        return false;
      } else {
        return true;
      }
    }

    return response;
  })
