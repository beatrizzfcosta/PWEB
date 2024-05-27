//app.js

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const reqInterceptor = require("./middlewares/gotYourReq");
const routes = require("./controllers/index");

// Use request interceptor middleware
app.use(reqInterceptor);

// Use routes
app.use("/", routes);

module.exports = app;
