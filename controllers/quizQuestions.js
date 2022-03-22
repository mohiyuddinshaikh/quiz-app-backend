const mongoose = require("mongoose");
const constants = require("../constants");
const axios = require("axios");
const ObjectId = mongoose.Types.ObjectId;

/** Models */
const Quiz = require("../models/quiz");
const QuizQuestions = require("../models/quizQuestions");

module.exports = {
  /**
   * @api {post} /quiz-questions/get-quiz-questions
   * @apiDescription api to fetch quiz questions
   */
  async getQuizQuestions(req, res) {
    try {
      const { quizId } = req.body;
      if (!quizId) {
        return res.status(400).send({
          message: constants.REQUIRED_PARAMETERS,
        });
      }

      const questions = await QuizQuestions.find(
        { quizId },
        "-correctAnswer -incorrectAnswers"
      );
      return res
        .status(200)
        .send({ message: "Fetched successfully", data: questions });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },

  /**
   * @api {post} /quiz-questions/bulk-create-questions
   * @apiDescription api to bulk create quiz questions
   */
  async bulkCreateQuizQuestions(req, res) {
    try {
      const computerScienceEasy20 =
        "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple";
      const computerScienceEasyQuizId = 1;
      const generalKnowledgeEasy20 =
        "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple";
      const generalKnowledgeEasyQuizId = 2;
      const scienceAndNatureEasy20 =
        "https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple";
      const scienceAndNatureEasyQuizId = 3;

      const response = await axios.get(scienceAndNatureEasy20);
      console.log("response", response);
      const quiz = await Quiz.findOne({ quizId: scienceAndNatureEasyQuizId });

      let arr = [];
      if (response.data.response_code === 0 && response.data.results.length) {
        for (const item of response.data.results) {
          let obj = {
            quizId: quiz._id,
            question: item.question,
            difficulty: item.difficulty,
            correctAnswer: item.correct_answer,
            incorrectAnswers: item.incorrect_answers,
            subject: item.category,
            options: [item.correct_answer, ...item.incorrect_answers],
          };
          arr.push(obj);
          const quizQues = new QuizQuestions(obj);
          await quizQues.save();
        }
        // console.log("arr :>> ", arr);
        // console.log("arr.count() :>> ", arr.length);
      }
      return res.status(200).send({ data: arr });
    } catch (error) {
      console.log("error", error);
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },
};
