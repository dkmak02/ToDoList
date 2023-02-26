const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    max: [50, 'Name must be shorterr that 50char'],
    unique: true,
  },
});
const List = mongoose.model('User', listSchema);
module.exports = List;
