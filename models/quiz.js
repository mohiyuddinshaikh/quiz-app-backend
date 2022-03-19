const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    quizId: { type: Number, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    difficulty: { type: Number, enum: [0, 1, 2], required: true }, // 0 - easy, 1 - medium, 2 - hard
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Quiz", quizSchema, "quiz");
