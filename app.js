const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

//Require Atlas database URI from environment variables
const DBURI = process.env.DB_URI
console.log(DBURI);
// const { errorLogger } = require("./utils/logger");



//Connect to MongoDB client using mongoose
mongoose
  .connect(DBURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err)
  });

mongoose.Promise = global.Promise;

//Use helmet to prevent common security vulnerabilities
app.use(helmet());

//Use body-parser to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());
///// Add APIs endpoints
app.use('/api', require("./api/router"))


app.get("/checkServer", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running",
  });
});

//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

//Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;


