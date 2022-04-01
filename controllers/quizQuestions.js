const mongoose = require("mongoose");
const constants = require("../constants");
const axios = require("axios");
const ObjectId = mongoose.Types.ObjectId;

/** Models */
const Quiz = require("../models/quiz");
const QuizQuestions = require("../models/quizQuestions");
const { MAX_NUMBER_OF_QUESTIONS } = require("../constants");

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
      const shuffledQuestions = shuffleArrayItems(questions);
      return res.status(200).send({
        message: "Fetched successfully",
        data: shuffledQuestions.slice(0, MAX_NUMBER_OF_QUESTIONS),
      });
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
            options: shuffleArrayItems([
              item.correct_answer,
              ...item.incorrect_answers,
            ]),
          };
          arr.push(obj);
          const quizQues = new QuizQuestions(obj);
          await quizQues.save();
        }
      }
      return res.status(200).send({ data: arr });
    } catch (error) {
      console.log("error", error);
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },

  /**
   * @api {post} /quiz-questions/shuffle-existing-quiz-options
   * @apiDescription api to shuffle existing quiz options
   */
  async shuffleExistingQuizOptions(req, res) {
    try {
      const quizQuestions = await QuizQuestions.find({});
      for (const item of quizQuestions) {
        let tempOptions = shuffleArrayItems(item.options);
        item.options = [...tempOptions];
        await item.save();
      }
      return res.status(200).send({ data: quizQuestions });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },
};

function shuffleArrayItems(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
