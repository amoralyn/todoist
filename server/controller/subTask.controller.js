(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const SubTask = require('./../model/subtask.model.js');

  module.exports = {
    createSubTask(req, res) {
      Task.findOne({
          _id: req.body.taskId
        })
        .exec()
        .then((user) => {
          if (!user) {
            return res.json({
              status: 404,
              message: 'Task not found'
            });
          }
          SubTask.findOne({
              title: req.body.title
            })
            .exec()
            .then((subTask) => {
              res.status(409).json({
                message: 'subTask already exists'
              })

              subTask = new SubTask({
                title: req.body.title,
                descrption: req.body.content,
                taskId: req.body.taskId
              })

              subTask.save()
                .then((subTask) => {
                  res.json(subTask);
                })
                .catch((err) => {
                  res.status(500).json(err);
                });

            })
            .catch((err) => {
              res.status(500).json(err);
            })
        })
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
