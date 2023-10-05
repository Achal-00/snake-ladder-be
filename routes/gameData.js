const express = require("express");
const {
  updateWinCount,
  updatePawns,
} = require("../controllers/gameController");

const router = express.Router();

router.post("/updatewincount", updateWinCount);

router.post("/updatepawn", updatePawns);

module.exports = router;
