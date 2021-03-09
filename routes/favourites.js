const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //FAVOURITE ROUTES
  //favourites GET route
  router.get("/favourites", (req, res) => {
    res.render("favourites");
  });
  router.post("/favourites", (req, res) => {});

  return router;
};

module.exports = router;
