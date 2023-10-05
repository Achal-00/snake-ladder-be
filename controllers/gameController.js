const User = require("../models/userModel");

// update winCount
const updateWinCount = async (req, res) => {
  const { username, newCount } = req.body;

  try {
    await User.updateWin(username, newCount);
    res.status(200).json({ success: "Game progress saved" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update pawn position
const updatePawns = async (req, res) => {
  const { username, playerOneScore, playerTwoScore } = req.body;

  try {
    await User.updatePawn(username, playerOneScore, playerTwoScore);
    res.status(200).json({ success: "Game progress saved" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { updateWinCount, updatePawns };
