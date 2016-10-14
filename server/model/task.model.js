(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;


  let taskSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: [true, 'Task already exists']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    userId: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'UserId is required']
    },
    subTask: [{
      type: ObjectId,
      required: false,
      ref: 'SubTask'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });


  let Task = mongoose.model('Task', taskSchema);
  module.exports = Task;

})();
