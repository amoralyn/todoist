(() => {
  'use strict';
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;


  let subTaskSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    taskId: {
      type: ObjectId,
      ref: 'Task',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });


  let SubTask = mongoose.model('SubTask', subTaskSchema);
  module.exports = SubTask;
})();
