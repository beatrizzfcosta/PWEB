//app.js

const express = require("express");
const app = express();

const routes = require("./controllers/index");

//first arg is route, second is folder paths (do not mix both(this is for me, yep))
//app.use("/login", routes.login);
app.use("/user", routes.user);
//app.use("/testing", routes.testing);

module.exports = app;
