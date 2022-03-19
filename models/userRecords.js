const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRecordsSchema = new Schema(
  {
    quizId: { type: Number, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model(
  "userRecords",
  userRecordsSchema,
  "user_records"
);
