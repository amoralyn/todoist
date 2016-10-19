angular.module('dooeet')
  .controller('userController', [
    '$scope', 'AuthService', '$window', '$state',

    function($scope, AuthService, $window, $state) {
      $scope.user = {};

      $scope.login = function(data) {
        AuthService.login(data).then(function(res) {
          setUser(res);
          $state.go('home');
        })
      };

      $scope.register = function(data) {
        AuthService.register(data).then(function(res) {
          setUser(res);
          $state.go('home');
        })
      }

      $scope.logout = function() {
        AuthService.logout();
        $state.go('login');
      }

      let setUser = function(res) {
        $window.localStorage.setItem('user', JSON.stringify(res));
      }

      let getUserStatus = function() {
        return $window.localStorage.getItem('user');
      }
    }
  ])
