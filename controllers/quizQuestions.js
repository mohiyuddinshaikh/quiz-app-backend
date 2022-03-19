const constants = require("../constants");

/** Models */
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
};
