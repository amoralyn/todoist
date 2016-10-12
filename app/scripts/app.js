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
