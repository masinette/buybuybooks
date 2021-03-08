const express = require("express");
const router = express.Router();

//MESSAGE ROUTES
router.get("/messages", (req, res) => {
  res.render("messages");
  // res.send("MESSAGES PAGE");
});
router.post("/messages", (req, res) => {
  res.render("messages");
  //AJAX, template for messages, passing in user input as var, and render to page
});

module.exports = router;
