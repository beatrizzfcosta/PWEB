const express = require("express");
const router = express.Router();

const createWarehouseRoutes = require("./routes/post");
const deleteWarehouseRoutes = require("./routes/delete");
const patchWarehouseRoutes = require("./routes/patch");
const getWarehouseRoutes = require("./routes/get");

const auth = require("../../middlewares/auth");
const partsRoutes = require("./parts/parts");

router.use("/part", auth, partsRoutes);

router.use("/", auth, getWarehouseRoutes);
router.use("/", auth, createWarehouseRoutes);
router.use("/", auth, deleteWarehouseRoutes);
//router.use("/", auth, patchWarehouseRoutes);

module.exports = router;
