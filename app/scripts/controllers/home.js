angular.module('dooeet')
  .controller('homeController', [
    '$scope', 'AuthService',
    function($scope, AuthService) {
      $scope.tasks = [{
        title: 'Finish the damn app',
        description: 'Do this and that'
      }, {
        title: 'Design the frontend',
        description: 'Do that and this'
      }];

      $scope.userExist = function() {
        return AuthService.userExist();
      }
    }
  ])
