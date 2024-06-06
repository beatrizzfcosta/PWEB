const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  console.log(`....${req.method}....${currentDateTime}....`);

  next();
});

module.exports = router;
