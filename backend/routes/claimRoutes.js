const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// Claim points for a user
router.post('/claim', claimController.claimPoints);

// Get claim history (paginated)
router.get('/history', claimController.getClaimHistory);

module.exports = router;
