const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // To track if this vote is for the current voting period
  votingPeriod: {
    type: String,
    required: true
  }
});

// Ensure one vote per student per voting period
voteSchema.index({ student: 1, votingPeriod: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);