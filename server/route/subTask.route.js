(() => {
  'use strict';

  const SubTask = require('./../controller/subTask.controller.js');
  const auth = require('./../middleware/auth.js');

  module.exports = (router) => {

    router.use(auth.middleware);

    //route to create a new subtask
    router.route('/subtasks')
      .post(SubTask.createSubTask)
      .get(SubTask.getAllSubTasks);

    //route to get all tasks of a specific user
    router.route('/task/:taskId/subtasks')
      .get(SubTask.getSubTaskByTask);

    //route to get a subtask by its Id
    router.route('/subtasks/:id')
      .get(SubTask.getASubTask)
      .put(auth.userAccess,
        SubTask.editSubTask)
      .delete(auth.userAccess,
        SubTask.deleteSubTask);
  }
})();
