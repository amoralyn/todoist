(() => {
  'use strict';
  angular.module('dooeet', ['ui.router'])
    .config(['$locationProvider',
      '$stateProvider',
      '$urlRouterProvider',
      '$httpProvider',
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

  require('./factories/tokenInjector.js');
  require('./controllers/home.js');
  require('./controllers/login.js');
  require('./controllers/task.js');
  require('./controllers/subtask.js');
  require('./controllers/timer.js');
  require('./services/authService.js');
  require('./services/taskService.js');
  require('./services/subTaskService.js');

})();
