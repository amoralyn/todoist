(() => {
  'use strict';
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
  mongoose.Promise = bluebird;

  routes(router);

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(methodOverride());
  app.use(cors());

  app.use(express.static(__dirname + '/public/'));

  // connect to database
  connect(mongoose, config.database);

  app.use('/api', router);

  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  });



  // Listen to port
  app.listen(config.port || 30390, function(err) {
    if (err) {
      throw err;
    };

    console.log('Successfully connected to ' + config.port);
  });


  module.exports = app;


})();
