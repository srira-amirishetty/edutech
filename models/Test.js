const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Test', testSchema);
