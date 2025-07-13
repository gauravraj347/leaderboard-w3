const User = require('../models/user');
const ClaimHistory = require('../models/claimHistory');

// Claim random points for a user
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Generate random points (1-10)
    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    // Create claim history
    const claim = new ClaimHistory({ user: user._id, pointsClaimed: points });
    await claim.save();

    // Get updated leaderboard
    const leaderboard = await User.find().sort({ totalPoints: -1 });

    res.status(200).json({
      message: `Claimed ${points} points for ${user.name}`,
      points,
      user,
      leaderboard
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to claim points' });
  }
};

// Get claim history (paginated)
exports.getClaimHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const history = await ClaimHistory.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ClaimHistory.countDocuments();

    res.status(200).json({
      history,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch claim history' });
  }
};
