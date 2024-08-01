const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  test_id: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selected_option: { type: String, required: true }
});

module.exports = mongoose.model('Response', ResponseSchema);
