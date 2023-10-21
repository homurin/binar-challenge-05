const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const errorHandler = require("./controllers/errorController.js");
const ApiError = require("./utils/apiError.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);
app.all("*", (req, res, next) => {
  next(new ApiError("Route does not exist"));
});
app.use(errorHandler);

module.exports = app;
