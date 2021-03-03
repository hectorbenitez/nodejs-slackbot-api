const { Router } = require("express");
const userSurveyAnswersRouter = Router();
const { getAllSurveysByUser, startSurvey, saveAnswer } = require('../controller/userSurveyAnswers.controller')

userSurveyAnswersRouter.get("/all", getAllSurveysByUser);
userSurveyAnswersRouter.post("/", startSurvey)
userSurveyAnswersRouter.post("/saveAnswer", saveAnswer)

module.exports = userSurveyAnswersRouter;