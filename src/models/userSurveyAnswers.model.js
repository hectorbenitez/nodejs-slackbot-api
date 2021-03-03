const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSurveyAnswersSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    survey: { type: Schema.Types.ObjectId, ref: "Survey" },
    isCompleted: { type: Boolean, default: false},
    questions: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserSurveyAnswers", UserSurveyAnswersSchema);
