(() => {
  'use strict';
  angular.module('dooeet')
    .controller('homeController', [
      '$scope', 'AuthService',
      function($scope, AuthService) {
        $scope.userExist = function() {
          return AuthService.userExist();
        }
      }
    ])

})();
