const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/pops")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));