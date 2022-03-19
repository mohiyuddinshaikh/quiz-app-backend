const express = require("express");
const router = express.Router();
const UserRecordsController = require("../../controllers/userRecords");

router.post("/get-leaderboard", UserRecordsController.getLeaderboard);
router.post("/submit-response", UserRecordsController.submitResponse);

module.exports = router;
