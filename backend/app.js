//app.js

const express = require("express");
const app = express();

const routes = require("./controllers/index");

app.use(express.json());
//first arg is route, second is folder paths (do not mix both(this is a reminder for me fyi))
app.use("/", routes);

module.exports = app;
