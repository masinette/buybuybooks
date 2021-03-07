const express = require("express");
const router = express.Router();

router.get("/myads", (req, res) => {
  res.render("myads");
});

router.post("/myads", (req, res) => {
  //AJAX, template for ads, passin in user input as var, and render to page
});

module.exports = router;
