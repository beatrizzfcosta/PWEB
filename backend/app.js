//app.js

const express = require("express");
const app = express();
app.use(express.json());

const reqInterceptor = require("./middlewares/gotYourReq");
const routes = require("./controllers/index");

// Use request interceptor middleware
app.use(reqInterceptor);

// Use routes
app.use("/", routes);

module.exports = app;
