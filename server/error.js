(() => {
  'use strict';

  module.exports = {
    parse(error) {
      let errors = {};
      Object.keys(error).forEach((err) => {
        errors[err] = {
          message: error[err].message
        };
      });
      return errors;
    }
  }
})();
