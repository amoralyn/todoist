(() => {
  'use strict';
  angular.module('dooeet')
    .service('TaskService', function($http, $q, $window) {
      let response = {};
      response.createNewTask = function(data) {
        let defer = $q.defer();
        $http.post('/api/tasks', data).success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }

      response.getAllTasks = function() {
        let defer = $q.defer();
        $http.get('/api/tasks').success(function(res) {
          defer.resolve(res);}).error(function(err) {

          console.log(err);
        })
        return defer.promise;
      }

      response.getTask = function(id) {
        let defer = $q.defer();
        $http.get('/api/tasks/' + id).success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }

      response.editTask = function(data) {
        let defer = $q.defer();
        $http.put('/api/tasks/:id', data).success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }

      response.deleteTask = function() {
        let defer = $q.defer();
        $http.delete('/api/tasks/:id').success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err)
        })
        return defer.promise;
      }

      return response;
    })

})();
