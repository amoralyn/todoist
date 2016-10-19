(() => {
  'use strict';

  const User = require('./../model/user.model.js');
  const Task = require('./../model/task.model.js');
  const config = require('./../config/environment.js');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');

  module.exports = {

    createNewUser(req, res) {
      let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      user.save()
        .then((user) => {
          user.password = undefined;
          res.status(200).json({
            user,
            message: 'User successfully created'
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    login(req, res) {
      //check if user exists
      User.findOne({
          email: req.body.email
        })
        .exec()
        .then((user) => {
          // if user does not exist
          if (!user) {
            return res.status(404).json({
              message: 'Authentication failed, User not found'
            });
          }
          //check if password matches
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // if user was found and password matches
            // create token 
            const token = jwt.sign({ id: user._id }, config.secretKey, {
              expiresIn: 60 * 60 * 24
            });
            user.password = undefined;
            return res.status(200).json({ user, token });
          }

        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getAllUsers(req, res) {
      User.find({})
        .exec()
        .then((users) => {
          if (!users) {
            return res.status(404).json({
              message: 'No users found '
            });
          }
          res.status(200).json(
              users
            )
            .catch((err) => {
              res.status(500).json(err);
            })
        })
    }
    getUserById(req, res) {
      User.findById({ _id: req.params.id }, '-password -__v')
        .exec()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    editUser(req, res) {
      User.findByIdAndUpdate(req.decoded.id, req.body, '-password')
        .exec()
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'No user found'
            });
          }
          res.json({
            user,
            message: 'User updated'
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    deleteUser(req, res) {
      User.findByIdAndRemove({ _id: req.params.id })
        .exec()
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              message: 'No user found'
            });
          }
          res.json({
            message: 'User deleted'
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    }
  }
})()
