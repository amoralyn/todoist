(() => {
  'use strict';
  angular.module('dooeet')
    .service('SubTaskService', function($http, $q, $window) {
      let response = {};
      response.createNewSubTask = function(data) {
        let defer = $q.defer();
        $http.post('/api/subTasks', data).success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }

      response.getAllSubTasks = function() {
        let defer = $q.defer();
        $http.get('/api/subTasks').success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }


      response.editSubTask = function(data) {
        let defer = $q.defer();
        $http.put('/api/subTasks/:id', data).success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err);
        })
        return defer.promise;
      }

      response.deleteSubTask = function() {
        let defer = $q.defer();
        $http.delete('/api/subTasks/:id').success(function(res) {
          defer.resolve(res);
        }).error(function(err) {
          console.log(err)
        })
        return defer.promise;
      }

      return response;
    })

})();
