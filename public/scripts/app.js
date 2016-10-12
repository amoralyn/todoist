(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('toDoIst', ['ui.router'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          controller: 'homeController',
          templateUrl: 'views/home.html'
        })
        .state('login', {
          url: '/login',
          controller: 'loginController',
          templateUrl: 'views/login.html'
        })
      $locationProvider.html5Mode(true);
    }
  ]);
require('./../../app/scripts/controllers/home.js');
require('./../../app/scripts/controllers/login.js');

},{"./../../app/scripts/controllers/home.js":2,"./../../app/scripts/controllers/login.js":3}],2:[function(require,module,exports){
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
      }]
    }
  ])

},{}],3:[function(require,module,exports){
angular.module('toDoIst')
  .controller('loginController', [
    '$scope',
    function($scope) {
      console.log('Login!')
    }
  ])

},{}]},{},[1]);
