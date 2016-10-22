(() => {
  'use strict';
  angular.module('dooeet')
    .controller('taskController', ['$scope',
      'TaskService',
      '$state',
      '$window',
      '$timeout',
      function($scope, TaskService, $state, $window, $timeout) {
        $scope.task = {};
        $scope.tasks = [];

        $scope.createNewTask = function(data) {
          TaskService
            .createNewTask(data)
            .then(function(res) {
              $scope.tasks.push(res);
            });
          $scope.getAllTasks();
          $state.reload();
        }

        $scope.getAllTasks = function() {
          TaskService
            .getAllTasks()
            .then(function(res) {
              $scope.tasks = res.reverse();
            })
        }

        $scope.getTask = function(id) {
          TaskService
            .getTask(id)
            .then(function(res) {
              $scope.task = res;
            });

          $timeout(function() {
            $window.$("#taskDetails").modal();
          }, 1500);
        }

        $scope.editTask = function(data) {
          TaskService
            .editTask(data)
            .then(function(res) {
              return res;
            })
        }

        $scope.deleteTask = function(data) {
          TaskService
            .deleteTask(data)
            .then(function(res) {
              return res;
            })
        }

      }
    ])
})();
