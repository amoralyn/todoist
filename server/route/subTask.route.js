(() => {
  'use strict';

  const subTaskController = require('./../controller/subTask.controller.js');
  const auth = require('./../middleware/auth.js');

  module.exports = (router) => {

    router.use(auth.middleware);

    //route to create a new subtask
    router.route('/subtasks')
      .post(subTaskController.createSubTask)
      .get(subTaskController.getAllSubTasks);

    //route to get all tasks of a specific user
    // router.route('/task/:taskId/subtasks')
    //   .get(subTaskController.getSubTaskByTask);

    //route to get a subtask by its Id
    router.route('/subtasks/:id')
      .get(subTaskController.getASubTask)
      .put(auth.userAccess,
        subTaskController.editSubTask)
      .delete(auth.userAccess,
        subTaskController.deleteSubTask);
  }
})();
