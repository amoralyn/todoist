angular.module('dooeet', ['ui.router'])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/login');
      $httpProvider.interceptors.push('TokenInjector');


      $stateProvider
        .state('home', {
          url: '/home',
          controller: 'homeController',
          templateUrl: 'views/home.html'
        })
        .state('login', {
          url: '/login',
          controller: 'userController',
          templateUrl: 'views/login.html'
        })
      $locationProvider.html5Mode(true);
    }
  ])

require('./../../app/scripts/factories/tokenInjector.js');
require('./../../app/scripts/controllers/home.js');
require('./../../app/scripts/controllers/login.js');
require('./../../app/scripts/controllers/task.js');
require('./../../app/scripts/controllers/subtask.js');
require('./../../app/scripts/controllers/timer.js');
require('./../../app/scripts/services/authService.js');
require('./../../app/scripts/services/taskService.js');
require('./../../app/scripts/services/subTaskService.js');
