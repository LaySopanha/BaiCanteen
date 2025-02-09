const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const { authenticateUser, authorizeStudent } = require('../middleware/auth');

router.post('/cast', authenticateUser, authorizeStudent, voteController.castVote);
router.get('/results', authenticateUser, voteController.getResults);
router.get('/status', authenticateUser, authorizeStudent, voteController.checkVoteStatus);

module.exports = router;