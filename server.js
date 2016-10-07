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
  const routes = require('./server/route/index.js');
  const router = express.Router();
  const bluebird = require('bluebird');

  routes(router);


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

  app.use('/api', router);


  app.get('/*', function(req, res) {
    res.send({
      message: 'You have reached the To-Do-List API'
    });
  });

  // Listen to port
  app.listen(config.port, function(err) {
    if (err) {
      throw err;
    };

    console.log('Successfully connected to ' + config.port);
  });


  module.exports = app;


})();
