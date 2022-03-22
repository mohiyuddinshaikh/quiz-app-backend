const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizQuestionsSchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
    question: { type: String, required: true },
    difficulty: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    incorrectAnswers: [{ type: String }],
    subject: { type: String, required: true },
    options: [{ type: String, required: true }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model(
  "QuizQuestions",
  quizQuestionsSchema,
  "quiz_questions"
);
