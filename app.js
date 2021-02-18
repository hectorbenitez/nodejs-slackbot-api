const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const surveyRouter = require("./src/routes/survey.router");
const authRouter = require("./src/routes/auth.router");

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/v1/survey", surveyRouter);
app.use("/api/v1/auth", authRouter);

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
