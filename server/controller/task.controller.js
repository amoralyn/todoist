(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const User = require('./../model/task.model.js');

  module.exports = {
    createTask(req, res) {
      User.findOne({
          _id: req.body.userId
        })
        .exec()
        .then((user) => {
          if (!user) {
            return res.json({
              status: 404,
              message: 'User not found'
            });
          }
          Task.findOne({
              title: req.body.title
            })
            .exec()
            .then((task) => {
              res.status(409).json({
                message: 'Task already exists'
              })

              task = new Task({
                title: req.body.title,
                descrption: req.body.content,
                userId: req.body.userId,
                subTask: req.body.subTask
              })

              task.save()
                .then((task) => {
                  res.json(task);
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
    getAllTasks(req, res) {
      Task.find()
        .exec()
        .sort({ 'createdAt': 'descending' })
        .then((tasks) => {
          if (!tasks) {
            return res.json({
              status: 404,
              message: 'No tasks  found'
            });
          }
          res.send(tasks);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getATask(req, res) {
      Task.findById({ _id: req.params.id })
        .exec()
        .then((task) => {
          if (!task) {
            return res.json({
              status: 404,
              message: 'No task found'
            });
          }
          res.send(task);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getTaskByUser(req, res) {
      Task.find({ userId: req.params.userId })
        .exec()
        .then((task) => {
          if (!task) {
            return res.json({
              status: 404,
              message: 'No task found'
            });
          }
          res.send(task);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    editTask(req, res) {
      Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .exec()
        .then((task) => {
          if (!task) {
            return res.json({
              status: 404,
              message: 'No task found'
            });
          }
          res.send(task);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    deleteTask(req, res) {
      Task.findByIdAndRemove({ _id: req.params.id })
        .exec()
        .then((task) => {
          if (!task) {
            return res.json({
              status: 404,
              message: 'No task found'
            });
          }
          res.json({
            message: 'Task deleted'
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        })

    }
  }

})();
