const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    max: [50, 'Name must be shorterr that 50char'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});
listSchema.virtual('activieties', {
  ref: 'ToDo',
  foreignField: 'list',
  localField: '_id',
});
const List = mongoose.model('List', listSchema);
module.exports = List;
