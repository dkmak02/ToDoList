const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      max: [50, 'Name must be shorterr that 50char'],
      unique: true,
      required: [true, 'List must have a name'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'List must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
listSchema.virtual('activities', {
  ref: 'Activity',
  foreignField: 'list',
  localField: '_id',
});
listSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'email',
  });
  next();
});
//delete activities when list is deleted
listSchema.pre(/^findByIdAndDele/, async function (next) {
  const list = await this.model.findById(this._conditions._id);
  console.log('xdd');
  await list.activities.forEach(async (activity) => {
    await this.model('Activity').findByIdAndDelete(activity);
  });
  next();
});
const List = mongoose.model('List', listSchema);
module.exports = List;
