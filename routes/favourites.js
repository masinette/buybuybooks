const express = require("express");
const router = express.Router();

//FAVOURITE ROUTES
//favourites GET route
router.get("/favourites", (req, res) => {
  res.render("favourites");
});
router.post("/favourites", (req, res) => {});

module.exports = router;
