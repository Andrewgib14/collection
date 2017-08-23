const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const path = require("path");
const PopVinyl = require("./models/PopVinyl.js")
const indexRoutes = require("./routes/routes.js")
const port = process.env.PORT || 8000;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/pops");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use('/static', express.static(path.join(__dirname, './public')))
app.use("/", indexRoutes);

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})