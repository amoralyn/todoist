angular.module("dooeet")
  .factory('TokenInjector', ['$window', function($window) {
    let tokenInjector = {};

    tokenInjector.request = function(config) {
      let user = $window.localStorage.getItem('user');
      let token = user ? JSON.parse(user).token : null;
      if (token && config.url.indexOf('/api') !== -1) {
        config.headers['x-access-token'] = token;
      }
      return config;
    }

    return tokenInjector;
  }])
