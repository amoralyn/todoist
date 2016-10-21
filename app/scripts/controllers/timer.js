(() => {
  'use strict';
  angular.module('dooeet')
    .controller('timerController', [
      '$scope', '$interval',

      function($scope, $interval) {
        let timer = null;
        $scope.isActive = true;
        $scope.current = null;

        $scope.start = function() {
          $scope.current = {
            left: 25 * 60
          };
          runTimer();
          timer = $interval(function() {
            runTimer();
          }, 1000);
        };


        $scope.pause = function() {
          $scope.isActive = false;
        };

        $scope.resume = function() {
          $scope.isActive = true;
        };

        $scope.stop = function() {
          $scope.current = null;
        };

        $scope.finish = function() {
          store.add($scope.current)
            .then(function success() {
              $scope.current = null;
            });
        };

        $scope.humanizeTimeleft = function() {
          var text = "";
          if ($scope.current && $scope.current.left) {
            var minutes = Math.floor($scope.current.left / 60);
            var seconds = $scope.current.left - minutes * 60;
            text = pad(minutes, 2) + ':' + pad(seconds, 2);
          }
          return text;
        };

        var runTimer = function() {
          if ($scope.isActive) {
            $scope.current.left -= 1;
            if ($scope.current.left <= 0) {
              $interval.cancel(timer);
              $scope.finish();
            }
          }
        };

        var pad = function(num, size) {
          var s = num + "";
          while (s.length < size) s = "0" + s;
          return s;
        };
      }
    ]);

})();
