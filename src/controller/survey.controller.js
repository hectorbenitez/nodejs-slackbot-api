const Survey = require("../models/survey.model");

const getAllSurveys = async (req, res) => {
    try {
      const surveys = await Survey.find();
      res.json(surveys);
    } catch (error) {
      console.error("get all surveys: ", error);
      res.status(500).send("Internal Server Error");
    }
};

const createSurvey = (req, res) => {
    try {
    console.log(req.body)
      const newSurvey = new Survey(req.body);
      newSurvey.save((err, survey) => {
        if (err) {
          //res.send("Survey incorrect");
          return console.error(err);
        }
        console.log("Survey saved successfully!");
      });
      res.json(newSurvey).status(201);
    } catch (error) {
      console.error("get all surveys: ", error);
      res.status(500).send("Internal Server Error");
    }
};

module.exports = {
  getAllSurveys,
  createSurvey
};
