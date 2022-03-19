const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/** Models */
const Quiz = require("../models/quiz");

module.exports = {
  /**
   * @api {post} /quiz/get-all-quizzes
   * @apiDescription api to fetch all active quizzes
   */
  async getAllQuiz(req, res) {
    try {
      const quizzes = await Quiz.find({});
      return res.status(200).send({ message: "Fetched successfully", quizzes });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ error: "Something went wrong." });
    }
  },
};
