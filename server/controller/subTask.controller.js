(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const SubTask = require('./../model/subtask.model.js');

  module.exports = {
    createSubTask(req, res) {
      let subTask = new SubTask({
        description: req.body.description
,
        taskId: req.body.taskId
      });

      function addSubTaskIdToTask(id) {
        Task.update({ _id: req.decoded._id }, {
            $push: {
              subTasks: id
            }
          })
          .exec()
          .then((done) => {
            res.json(subTask)
          })
          .catch((err) => {
            res.status(500).json(err)
          })
      }

      subTask.save()
        .then((subTask) => {
          addSubTaskIdToTask(subTask._id)
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    },
    getAllSubTasks(req, res) {
      SubTask.find()
        .exec()
        .sort({ 'createdAt': 'descending' })
        .then((subTask) => {
          if (!subTask) {
            return res.json({
              status: 404,
              message: 'No subTask found'
            });
          }
          res.send(subTask);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getASubTask(req, res) {
      SubTask.findById({ _id: req.params.id })
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.json({
              status: 404,
              message: 'No subTask found'
            });
          }
          res.send(subTask);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getSubTaskByTask(req, res) {
      SubTask.find({ taskId: req.params.taskId })
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.json({
              status: 404,
              message: 'No subTask found'
            });
          }
          res.send(subTask);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    editSubTask(req, res) {
      SubTask.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.json({
              status: 404,
              message: 'No subTask found'
            });
          }
          res.send(subTask);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    deleteSubTask(req, res) {
      SubTask.findByIdAndRemove({ _id: req.params.id })
        .exec()
        .then((subTask) => {
          if (!subTask) {
            return res.json({
              status: 404,
              message: 'No subTask found'
            });
          }
          res.json({
            message: 'SubTask deleted'
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        })

    }
  }

})();
