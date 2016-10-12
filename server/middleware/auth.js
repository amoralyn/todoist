(() => {
  'use strict';


  const config = require('./../config/environment.js');
  const jwt = require('jsonwebtoken');
  const Task = require('./../model/task.model.js');

  module.exports = {

    middleware(req, res, next) {
      //check header, url parameters or post parameters for token
      let token = req.body.token || req.query.token ||
        req.headers['x-access-token'];

      if (token) {
        //verify secret 
        jwt.verify(token, config.secretKey, function(err, decoded) {
          if (err) {
            return res.status(401).json({
              error: err,
              message: 'Failed to authenticate token'
            });
          } else {
            //if everything is good
            req.decoded = decoded;
            next();
          }
        });
      } else {
        //if no token is found
        return res.status(403).send({
          message: 'No token provided'
        });
      }
    },
    userAccess(req, res, next) {
      Task.findOne({ '_id': req.params.id })
        .exec()
        .then((task) => {
          if (!task) {
            return res.json({
              status: 404,
              message: 'No task found'
            });
          }
          if (req.decoded.id !== task.userId.toString()) {
            res.status(403).json({
              message: 'Access Denied'
            })
          }
          next();
        })
        .catch((err) => {
          res.status(500).json(err);
        })
    }


  }
})();
