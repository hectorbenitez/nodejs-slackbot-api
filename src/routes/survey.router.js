const { Router } = require("express");
const surveyRouter = Router();
const { getAllSurveys, createSurvey } = require('../controller/survey.controller')
const { validateJWT } = require('../middlewares/validateJWT');

surveyRouter.get("/all", [validateJWT],getAllSurveys);
surveyRouter.post("/", createSurvey)

module.exports = surveyRouter;
