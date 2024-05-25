const express = require("express");
const router = express.Router();

const createWarehouseRoutes = require("./routes/post");
const deleteWarehouseRoutes = require("./routes/delete");
const patchWarehouseRoutes = require("./routes/patch");
const auth = require("../../middlewares/auth");

//router.use("/", auth, createWarehouseRoutes);
//router.use("/", auth, deleteWarehouseRoutes);
//router.use("/", auth, patchWarehouseRoutes);

module.exports = router;
