const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  test_id: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  question_text: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
