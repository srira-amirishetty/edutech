const express = require('express');
const Test = require('../models/Test');
const Question = require('../models/Question');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// @desc    Create a new test
// @route   POST /tests/create-test
// @access  Private (Teacher only)
router.post('/create-test', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const { title, description, questions } = req.body;

  try {
    const test = new Test({ title, description, createdBy: req.user._id });
    await test.save();

    const questionDocs = questions.map(question => ({
      test_id: test._id,
      question_text: question.text,
      options: question.options,
      correct_answer: question.correctOption
    }));

    await Question.insertMany(questionDocs);

    res.status(201).json({ message: 'Test created successfully', test });
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ message: 'Failed to create test', error });
  }
});

// @desc    Get all tests created by the user
// @route   GET /tests
// @access  Private
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tests' });
  }
});

// @desc    Update a test
// @route   PUT /tests/:id
// @access  Private
router.put('/:id', authenticateJWT, async (req, res) => {
  const { title, description } = req.body;
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update test' });
  }
});

// @desc    Delete a test
// @route   DELETE /tests/:id
// @access  Private
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete test' });
  }
});

module.exports = router;
