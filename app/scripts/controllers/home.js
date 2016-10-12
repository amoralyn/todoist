angular.module('toDoIst')
  .controller('homeController', [
    '$scope',
    function($scope) {
      $scope.tasks = [{
        title: 'Finish the damn app',
        description: 'Do this and that'
      }, {
        title: 'Design the frontend',
        description: 'Do that and this'
      }];

    }
  ])
