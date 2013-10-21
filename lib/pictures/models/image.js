var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  name: String,
  type: String,
  size: Number,
  lastModified: String,
  totalCount: {
    type: Number,
    default: 0
  },
  uniqueCount: {
    type: Number,
    default: 0
  },
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