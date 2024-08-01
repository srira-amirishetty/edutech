const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  test_id: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('Result', ResultSchema);
