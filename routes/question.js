const express = require('express');
const Question = require('../models/Question');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// @desc    Add a question to a test
// @route   POST /questions
// @access  Private
router.post('/', authenticateJWT, async (req, res) => {
  const { test_id, question_text, options, correct_answer } = req.body;
  try {
    const question = new Question({ test_id, question_text, options, correct_answer });
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add question' });
  }
});

// @desc    Get all questions for a test
// @route   GET /questions/:testId
// @access  Private
router.get('/:testId', authenticateJWT, async (req, res) => {
  try {
    const questions = await Question.find({ test_id: req.params.testId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

// @desc    Update a question
// @route   PUT /questions/:id
// @access  Private
router.put('/:id', authenticateJWT, async (req, res) => {
  const { question_text, options, correct_answer } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, { question_text, options, correct_answer }, { new: true });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question' });
  }
});

// @desc    Delete a question
// @route   DELETE /questions/:id
// @access  Private
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
});

module.exports = router;
