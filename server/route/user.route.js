(() => {
  'use strict';

  const User = require('./../controller/user.controller.js');
  const auth = require('./../middleware/auth.js');

  module.exports = (router) => {
    //route to login a user
    router.route('/users/login')
      .post(User.login);

    //route to create a new user
    router.route('/user')
      .post(User.createNewUser);


    router.use(auth.middleware);
    //route to get all available users
    router.route('/users')
      .get(User.getAllUsers);

    //route to get, edit and delete a user specified by its Id
    router.route('/user/:id')
      .get(User.getUserById)
      .put(User.editUser)
      .delete(User.deleteUser);
  }


})();
