const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSurveyAnswersSchema = new Schema(
  {
    userId: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    sourveyId: { type: String },
    isCompleted: { type: Boolean },
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
