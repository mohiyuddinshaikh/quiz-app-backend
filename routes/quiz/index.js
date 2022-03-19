const express = require("express");
const router = express.Router();
const QuizController = require("../../controllers/quiz");

router.get("/get-all-quizzes", QuizController.getAllQuiz);

module.exports = router;
