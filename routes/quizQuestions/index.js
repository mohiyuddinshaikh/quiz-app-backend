const express = require("express");
const router = express.Router();
const QuizQuestionsController = require("../../controllers/quizQuestions");

router.post("/get-quiz-questions", QuizQuestionsController.getQuizQuestions);

module.exports = router;
