(() => {
  'use strict';

  if (!process.env.NODE_ENV) {
    var dotenv = require('dotenv')

    dotenv.load();
  }
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const methodOverride = require('method-override');
  const cors = require('cors');
  const config = require('./server/config/environment.js');
  const connect = require('./server/config/connections.js')
  const mongoose = require('mongoose');
  const controller = require('./server/controller/user.controller.js');
  const bluebird = require('bluebird');
  const auth = require('./server/middleware/auth.js');

  mongoose.Promise = bluebird;


  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(methodOverride());
  app.use(cors());

  // connect to database
  connect(mongoose, config.database);


  app.get('/*', function(req, res) {
    res.send({
      message: 'You have reached the To-Do-List API'
    });
  });



  app.post('/api/users', controller.createNewUser);
  app.post('/api/users/login', controller.login);
  app.get('/api/users', auth.middleware, controller.getAllUsers);
  app.get('/api/users/:name', auth.middleware, controller.getUser);
  app.get('/api/user/:_id', controller.getUserById);
  // Listen to port
  app.listen(config.port, function(err) {
    if (err) {
      throw err;
    };

    console.log('Successfully connected to ' + config.port);
  });


  module.exports = app;


})();
