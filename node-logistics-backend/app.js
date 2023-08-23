const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routes = require("./config/routes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Connect to MongoDB
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use routes
app.use("/api", routes);

module.exports = app;
