//app.js

const express = require("express");
const app = express();
app.use(express.json());

const routes = require("./controllers/index");

//first arg is route, second is folder paths (do not mix both(this is a reminder for me fyi))
app.use("/", routes);

module.exports = app;
