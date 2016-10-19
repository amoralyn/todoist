(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const SubTask = require('./../model/subtask.model.js');

  module.exports = {
    createSubTask(req, res) {
      let taskId = req.query.taskId;
      let subTask = new SubTask({
        description: req.body.description,
        taskId: taskId
      });

      function addSubTaskIdToTask(id, subTask) {

        let update = {
          $push: { subTasks: id }
        };
        return Task
          .findByIdAndUpdate(taskId, update)
          .exec()
          .then((done) => {
            return res.status(200).json(subTask)
          })
          .catch((err) => {
            return res.status(500).json(err)
          })
      }

      subTask.save()
        .then((subTask) => {
          return addSubTaskIdToTask(subTask._id, subTask)
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    },
    getAllSubTasks(req, res) {
      SubTask.find()
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.status(404).json({
              message: 'No subTask found'
            });
          }
          return res.status(200).json(subTask);
        })
        .catch((err) => {
          return res.status(500).json(err);
        })
    },
    getASubTask(req, res) {
      SubTask.findById(taskId)
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.status(404).json({
              message: 'No subTask found'
            });
          }
          return res.send(subTask);
        })
        .catch((err) => {
          return res.status(500).json(err);
        })
    },
    // getSubTaskByTask(req, res) {
    //   SubTask.find(taskId)
    //     .exec()
    //     .then((subTask) => {
    //       if (!subTask) {
    //         return res.json({
    //           status: 404,
    //           message: 'No subTask found'
    //         });
    //       }
    //       return res.send(subTask);
    //     })
    //     .catch((err) => {
    //       return res.status(500).json(err);
    //     })
    // },
    editSubTask(req, res) {
      SubTask.findByIdAndUpdate(taskId, req.body)
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.status(404).json({
              message: 'No subTask found'
            });
          }
          return res.status(200).json(subTask);
        })
        .catch((err) => {
          return res.status(500).json(err);
        })
    },
    deleteSubTask(req, res) {
      SubTask.findByIdAndRemove(taskId)
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.status(404).json({
              message: 'No subTask found'
            });
          }
          return res.status(200).json({
            message: 'SubTask deleted'
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        })

    }
  }

})();
