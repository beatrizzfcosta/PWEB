const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());
router.use((req, res, next) => {
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  console.log(`Data e tempo de pedido: ${currentDateTime} `);
  console.log(`Tipo de pedido: ${req.method}`);
  next();
});

module.exports = router;
