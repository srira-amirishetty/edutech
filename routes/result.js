const express = require('express');
// const Question = require('../models/Question');
const Response = require('../models/Response');
const Result = require('../models/Result');
const Test = require('../models/Test');
const User = require('../models/User');
const authenticateJWT = require('../middlewares/authenticateJWT');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// @desc    Get results for a test
// @route   GET /results/:test_id
// @access  Private
router.get('/:test_id', authenticateJWT, async (req, res) => {
    const test_id = req.params.test_id;
    const user_id = req.user._id;
  
    try {
      const responses = await Response.find({ test_id, user_id }).populate('question_id');
      let score = 0;
  
      for (const response of responses) {
        const question = response.question_id;
        if (question.correct_answer === response.selected_option) {
          score++;
        }
      }
  
      // Save result
      let result = await Result.findOne({ test_id, user_id });
      if (!result) {
        result = new Result({ user_id, test_id, score });
        await result.save();
      } else {
        result.score = score;
        await result.save();
      }
  
      // Get test and user details
      const test = await Test.findById(test_id);
      const user = await User.findById(user_id);
  
      res.status(200).json({
        testName: test.title,
        userName: user.username,
        score: result.score
      });
    } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ message: 'Failed to fetch results', error });
    }
  });


// @desc    Get results for a specific test
// @route   GET /api/results/:testId
// @access  Private
// router.get('/:testId', protect, async (req, res) => {
//     try {
//       const results = await Result.find({ test_id: req.params.testId })
//         .populate('test_id', 'title')
//         .populate('student_id', 'username');
//       res.json(results);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch results', error: error.message });
//     }
//   });





  // @desc    Get all results (Teacher only)
// @route   GET /api/results/all
// @access  Private
router.get('/all', protect, async (req, res) => {
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Teachers only.' });
    }
  
    try {
      const results = await Result.find().populate('test_id', 'title').populate('student_id', 'username');
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch results', error: error.message });
    }
  });

module.exports = router;
