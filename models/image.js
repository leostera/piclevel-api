var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  name: String,
  hash: String,
  url: String,
  totalCount: Number,
  uniqueCount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Image', imageSchema);