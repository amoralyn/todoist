(() => {
  'use strict';

  const Task = require('./../model/task.model.js');
  const User = require('./../model/user.model.js');

  module.exports = {
    createTask(req, res) {
      let userId = req.decoded.id;
      let task = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: userId,
        done: false
      });

      function addTaskIdToUser(id, task) {

        let update = {
          $push: { tasks: id }
        };

        return User
          .findByIdAndUpdate(req.decoded.id, update)
          .exec()
          .populate('tasks')
          .then(() => {
            res.status(200).json(task)
          })
          .catch((err) => {
            res.status(500).json(err)
          })
      }

      task.save()
        .then((task) => {
          return addTaskIdToUser(task._id, task)
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
            return res.status(404).json({
              message: 'No tasks  found'
            });
          }
          res.status(200).json(tasks);
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
            return res.status(404).json({
              message: 'No task found'
            });
          }
          res.status(200).json(task);
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
            return res.status(404).json({
              message: 'No task found'
            });
          }
          res.status(200).json(task);
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
            return res.status(404).json({
              message: 'No task found'
            });
          }
          res.status(200).json({
            task,
            message: 'Task successfully updated'
          });
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
            return res.status(404).json({
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
