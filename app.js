const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});