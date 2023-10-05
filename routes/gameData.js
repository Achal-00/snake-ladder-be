const express = require("express");
const {
  updateWinCount,
  updatePawns,
} = require("../controllers/gameController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/updatewincount", updateWinCount);

router.post("/updatepawn", updatePawns);

module.exports = router;
