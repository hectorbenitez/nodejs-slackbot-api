const { sync } = require("touch");
const UserSurveyAnswers = require("../models/userSurveyAnswers.model");
const Survey = require("../models/survey.model");
const User = require("../models/user.model");

const getAllSurveysByUser = async (req, res) => {
  try {
    const surveys = await UserSurveyAnswers.find();
    res.json(surveys);
  } catch (error) {
    console.error("get all surveys: ", error);
    res.status(500).send("Internal Server Error");
  }
};

/* body
  {
    "userId":      ,
    "surveyName":
  }
  */
const startSurvey = async (req, res) => {
  try {
    const { userId, surveyName } = req.body;

    const user = await User.findOne({ userId: userId });
    const survey = await Survey.findOne({ surveyName: surveyName });
    const questions = survey.questions;

    let user_questions = questions.map(({ question }) => {
      return { question, answer: "" };
    });

    const userSurvey = {
      user,
      survey,
      questions: user_questions,
    };
    const newUserSurvey = new UserSurveyAnswers(userSurvey);

    newUserSurvey.save((err, survey) => {
      if (err) {
        return console.error(err);
      }
      console.log("User Survey started successfully!");
    });
    res.json(newUserSurvey).status(201);
  } catch (error) {
    console.error("User surver started error: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllSurveysByUser,
  startSurvey,
};
