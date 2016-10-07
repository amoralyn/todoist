(() => {
  'use strict';

  const Task = require('./../controller/task.controller.js');
  const auth = require('./../middleware/auth.js');

  module.exports = (router) => {

    router.use(auth.middleware);

    //route to create a new task
    router.route('/tasks')
      .post(Task.createTask)
      .get(Task.getAllTasks);

    //route to get all tasks of a specific user
    router.route('/user/:userId/tasks')
      .get(Task.getTaskByUser);

    //route to get a document by its Id
    router.route('/tasks/:id')
      .get(Task.getATask)
      .put(auth.userAccess,
        Task.editTask)
      .delete(auth.userAccess,
        Task.deleteTask);
  }

})();
