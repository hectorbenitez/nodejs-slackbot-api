const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const surveyRouter = require("./src/routes/survey.router");

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/v1/", surveyRouter);

//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
