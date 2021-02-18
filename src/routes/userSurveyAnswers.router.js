const { Router } = require("express");
const userSurveyAnswersRouter = Router();
const { getAllSurveysByUser, startSurvey } = require('../controller/userSurveyAnswers.controller')

userSurveyAnswersRouter.get("/all", getAllSurveysByUser);
userSurveyAnswersRouter.post("/", startSurvey)

module.exports = userSurveyAnswersRouter;