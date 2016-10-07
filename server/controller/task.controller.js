(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const User = require('./../model/task.model.js');
  const SubTask = require('./../model/subtask.model.js');

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

              let task = new Task({
                title: req.body.title,
                descrption: req.body.content,
                userId: req.body.userId,
                subTask: req.body.subTask
              });

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
    }
  }

})();
