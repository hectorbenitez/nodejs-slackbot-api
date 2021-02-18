const { Router } = require("express");
const surveyRouter = Router();
const { getAllSurveys, createSurvey } = require('../controller/survey.controller')

surveyRouter.get("/all", getAllSurveys);
surveyRouter.post("/", createSurvey)

module.exports = surveyRouter;