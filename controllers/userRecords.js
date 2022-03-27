const constants = require("../constants");

/** Models */
const UserRecords = require("../models/userRecords");
const QuizQuestions = require("../models/quizQuestions");

module.exports = {
  /**
   * @api {post} /user-records/submit-response
   * @apiDescription api to submit a response
   */
  async submitResponse(req, res) {
    try {
      const { quizId, response, name } = req.body;

      if (!quizId || !response.length || !name) {
        return res.status(400).send({
          message: constants.REQUIRED_PARAMETERS,
        });
      }

      let score = 0;
      const questionsData = await QuizQuestions.find({ quizId });

      for (const responseObject of response) {
        for (const questionObject of questionsData) {
          if (responseObject._id == questionObject._id) {
            if (responseObject.answer === questionObject.correctAnswer) {
              score += 1;
              break;
            }
          }
        }
      }

      const responseBody = {
        quizId,
        name,
        score,
      };
      let userRecord = new UserRecords(responseBody);
      await userRecord.save();

      return res.status(200).send({
        message: "Response submitted successfully",
        data: { secured: score, total: constants.MAX_NUMBER_OF_QUESTIONS },
      });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },

  /**
   * @api {post} /user-records/get-leaderboard
   * @apiDescription api to get leaderboard for this particular quiz and category
   */
  async getLeaderboard(req, res) {
    try {
      const { quizId, sendAll } = req.body;
      if (!quizId) {
        return res.status(400).send({
          message: constants.REQUIRED_PARAMETERS,
        });
      }

      const allRecordForThisQuiz = await UserRecords.find(
        { quizId },
        "name score"
      );

      let recordsToSend = [];
      let sortedRecords = allRecordForThisQuiz.sort(
        (a, b) => a.score - b.score
      );

      if (sortedRecords.length) {
        sortedRecords = sortedRecords.reverse();
        if (sendAll) {
          recordsToSend = sortedRecords;
        } else {
          recordsToSend = sortedRecords.slice(0, 3);
        }
      }

      return res.status(200).send({
        message: "Response submitted successfully",
        data: recordsToSend,
      });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong.", error });
    }
  },
};
