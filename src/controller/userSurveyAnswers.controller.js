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
    "_idUser":      ,
    "_idSurvey":
  }
  */
const startSurvey = async (req, res) => {
  try {
    const { _idUser, _idSurvey } = req.body;

    const user = await User.findById(_idUser);
    const survey = await Survey.findById(_idSurvey);
    const questions = survey.questions;

    let user_questions = questions.map(({question}) => {
      return { question, answer: "" };
    });

    const userSurvey = {
      user,
      survey,
      questions: user_questions,
    };
    const newUserSurvey = new UserSurveyAnswers(userSurvey);

    console.log(newUserSurvey)
    console.log(req.query);
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
