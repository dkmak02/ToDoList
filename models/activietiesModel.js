const mongoose = require('mongoose');
//const validator = require('validator');

const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: [true, 'Must have activity'],
    },
    list: {
      type: mongoose.Schema.ObjectId,
      ref: 'List',
      required: [true, 'Activity must belong to a list'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Activity must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
activitySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email name',
  });
  this.populate({
    path: 'list',
    select: '-user name',
  });
  next();
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
