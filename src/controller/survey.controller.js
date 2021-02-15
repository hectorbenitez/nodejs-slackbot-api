const Survey = require('../models/survey.model');
const getAllSurveys = (req, res) => {
    res.json({data: "Hello Survey"});
}

module.exports = {
    getAllSurveys
}