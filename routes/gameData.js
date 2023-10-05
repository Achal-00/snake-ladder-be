const express = require("express");
const {
  updateWinCount,
  updatePawns,
  getLeaderboard,
} = require("../controllers/gameController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/updatewincount", updateWinCount);

router.post("/updatepawn", updatePawns);

router.get("/getleaderboard", getLeaderboard);

module.exports = router;
