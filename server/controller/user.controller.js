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
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
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
            return res.json({
              status: 404,
              message: 'Authentication failed, User not found'
            });
          }
          //check if password matches
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // if user was found and password matches
            // create token 
            const token = jwt.sign(user._id, config.secretKey, {
              expiresIn: 60 * 60 * 24
            });
            return res.status(200).json({ user, token });
          }

        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getAllUsers(req, res) {
      User.find()
        .exec()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getUser(req, res) {
      User.findOne({ name: req.params.name })
        .exec()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    },
    getUserById(req, res) {
      User.findById(req.params._id)
        .exec()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    }
  }
})()
