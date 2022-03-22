const express = require("express");
const router = express.Router();
const QuizQuestionsController = require("../../controllers/quizQuestions");

router.post("/get-quiz-questions", QuizQuestionsController.getQuizQuestions);
router.post(
  "/bulk-create-questions",
  QuizQuestionsController.bulkCreateQuizQuestions
);

module.exports = router;
