(() => {
  'use strict';

  const taskController = require('./../controller/task.controller.js');
  const auth = require('./../middleware/auth.js');

  module.exports = (router) => {

    router.use(auth.middleware);

    //route to create a new task
    router.route('/tasks')
      .post(taskController.createTask)
      .get(taskController.getAllTasks);

    //route to get all tasks of a specific user
    router.route('/user/:userId/tasks')
      .get(taskController.getTaskByUser);

    //route to get a document by its Id
    router.route('/tasks/:id')
      .get(taskController.getATask)
      .put(auth.userAccess,
        taskController.editTask)
      .delete(auth.userAccess,
        taskController.deleteTask);
  }

})();
