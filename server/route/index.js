(() => {
  'use strict';

  const userRoutes = require('./user.route');
  const taskRoutes = require('./task.route');
  const subTaskRoutes = require('./subTask.route');

  module.exports = (router) => {
    userRoutes(router);
    taskRoutes(router);
    subTaskRoutes(router);
  }

})();
