const express = require("express");
const router = express.Router();

const Quiz = require("./quiz/index");
const QuizQuestions = require("./quizQuestions/index");
const UserRecords = require("./userRecords/index");

/* Auth */
router.use("/quiz", Quiz);
router.use("/quiz-questions", QuizQuestions);
router.use("/user-records", UserRecords);

module.exports = router;
