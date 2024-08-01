const express = require('express');
const Response = require('../models/Response');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// @desc    Submit responses for a test
// @route   POST /responses
// @access  Private
router.post('/', authenticateJWT, async (req, res) => {
  const { test_id, responses } = req.body;
  const user_id = req.user._id;

  try {
    const responseDocs = responses.map((response) => ({
      user_id,
      test_id,
      question_id: response.question_id,
      selected_option: response.selected_option
    }));

    await Response.insertMany(responseDocs);

    res.status(200).json({ message: 'Responses submitted successfully' });
  } catch (error) {
    console.error('Error submitting responses:', error);
    res.status(500).json({ message: 'Failed to submit responses', error });
  }
});

module.exports = router;
