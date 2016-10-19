(() => {
  'use strict';
  angular.module('dooeet')
    .controller('subTaskController', ['$scope', 'SubTaskService', '$state', '$window', '$timeout',
      function($scope, SubTaskService, $state, $window, $timeout) {
        $scope.subTask = {};
        $scope.subTaskFields = [{ description: "" }];
        $scope.subTasks = [];

        $scope.add = function() {
          $scope.subTaskFields.push({ description: "" });
        }

        $scope.createNewSubTask = function(data) {
          SubTaskService.createNewSubTask(data).then(function(res) {
            $scope.subTasks.push(res);
          });
          $scope.getAllSubTasks();
          $state.reload();
        }

        $scope.getAllSubTasks = function() {
          SubTaskService.getAllSubTasks().then(function(res) {
            $scope.subTasks = res.reverse();
          })
        }

        $scope.editSubTask = function(data) {
          SubTaskService.editSubTask(data).then(function(res) {
            return res;
          })
        }

        $scope.deleteSubTask = function(data) {
          SubTaskService.deleteSubTask(data).then(function(res) {
            return res;
          })
        }

      }
    ])
})();
