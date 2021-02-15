const { Router } = require("express");
const surveyRouter = Router();
const { getAllSurveys } = require('../controller/survey.controller')

surveyRouter.get("/all", getAllSurveys);

module.exports = surveyRouter;