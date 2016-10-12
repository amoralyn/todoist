(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const User = require('./../model/task.model.js');

  module.exports = {
    createTask(req, res) {
      let task = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        done: false
      });


      function addTaskIdToUser(id) {
        return User.update({ _id: req.decoded.id }, {
            $push: {
              tasks: id
            }
          })
          .exec()
          .then((done) => {
            res.json(task)
          })
          .catch((err) => {
            res.status(500).json(err)
          })
      }

      task.save()
        .then((task) => {
          return addTaskIdToUser(task._id)
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    },
    getAllTasks(req, res) {
      Task.find({})
        .exec()
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
