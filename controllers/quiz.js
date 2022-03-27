const mongoose = require("mongoose");
const { MAX_NUMBER_OF_QUESTIONS } = require("../constants");

/** Models */
const Quiz = require("../models/quiz");

module.exports = {
  /**
   * @api {post} /quiz/get-all-quizzes
   * @apiDescription api to fetch all active quizzes
   */
  async getAllQuiz(req, res) {
    try {
      const quizzes = await Quiz.find({}).lean();
      let quizzesToSend = [...quizzes];
      for (let oneQuiz of quizzesToSend) {
        oneQuiz.numberOfQuestions = MAX_NUMBER_OF_QUESTIONS;
      }
      return res.status(200).send({ message: "Fetched successfully", quizzes });
    } catch (error) {
      console.log("error :>> ", error);
      return res.status(500).send({ error: "Something went wrong." });
    }
  },
};
