//app.js

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const reqInterceptor = require("./middlewares/gotYourReq");
const routes = require("./controllers/index");


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')))


// Use request interceptor middleware
app.use(reqInterceptor);

// Use routes
app.use("/", routes);

module.exports = app;
