(() => {
  'use strict';
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;


  let subTaskSchema = new Schema({
    title: {
      type: String,
      required: true
    },
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


  let SubTask = mongoose.model('SubTask', taskSchema);
  module.exports = SubTask;
})();
