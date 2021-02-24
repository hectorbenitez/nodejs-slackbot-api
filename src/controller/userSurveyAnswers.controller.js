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

    let user = await User.findOne({ userId: userId });
    
    if(!user){
      const newUser = new User({
        userId
      })

      
      newUser.save((err) => {
        if (err) {
          return console.error(err);
        }
        console.log("new User saved successfully!");
      });
      user = newUser;
    }
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

/* body
  {
    "_idUserSurveyAnswers":      ,
    "_idQuestion":
    "answer":
  }
  */
const saveAnswer = async (req, res) => {
  try {
    const { _idUserSurveyAnswers, _idQuestion, answer } = req.body;
    console.log(req.body)
    const userSurveyAnswers = await UserSurveyAnswers.findById(
      _idUserSurveyAnswers
    );

    console.log(userSurveyAnswers)

    const { questions } = userSurveyAnswers;

    console.log(questions)

    questions.forEach((question, index) => {
      if(question._id==_idQuestion){
        question.answer = answer;
        if(index+1===questions.length){
            userSurveyAnswers.isCompleted=true;
        }
      }
    });

   
    userSurveyAnswers.save((err) => {
      if (err) {
        return console.error(err);
      }
      console.log("Answer saved successfully!");
    });
    res.json(userSurveyAnswers).status(200);
  } catch (error) {
    console.error("Answer saved error: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllSurveysByUser,
  startSurvey,
  saveAnswer,
};
