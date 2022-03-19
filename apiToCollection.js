async function getLeaderboard(req, resp) {
  try {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple"
    );
    let arr = [];
    if (res.data.response_code === 0 && res.data.results.length) {
      for (const item of res.data.results) {
        let obj = {
          quizId: 1,
          question: item.question,
          difficulty: item.difficulty,
          correctAnswer: item.correct_answer,
          incorrectAnswers: item.incorrect_answers,
          subject: item.category,
          options: [item.correct_answer, ...item.incorrect_answers],
        };
        arr.push(obj);
        // const question = new QuizQuestions(obj);
        // // arr.push(question.save());
        // await question.save();
      }
      // const allPromise = await Promise.all(arr);
      // console.log("allPromise :>> ", allPromise);
      console.log("arr :>> ", arr);
      console.log("arr.count() :>> ", arr.length);
    }
    return resp.status(200).send({ data: arr });
    //
    // const { quizId } = req.body;
    // if (!quizId) {
    //   return res.status(400).send({
    //     message: constants.REQUIRED_PARAMETERS,
    //   });
    // }

    // const allRecordForThisQuiz = await UserRecords.find({ quizId });
    // let sortedRecords = allRecordForThisQuiz.sort(
    //   (a, b) => a.score - b.score
    // );

    // return res.status(200).send({
    //   message: "Response submitted successfully",
    //   data: sortedRecords,
    // });
  } catch (error) {
    console.log("error :>> ", error);
  }
}
