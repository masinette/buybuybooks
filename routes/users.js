/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

router.get("/", (req, res) => {
  data = req.body;
  res.render("index");
});
//LOGIN/LOGOUT ROUTES
//login GET route, render login page with login buttons
router.get("/login/:id", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect("/");
});
router.get("/login", (req, res) => {
  res.render("user_login");
});
//logout POST route, redirect to main page
//LOGOUT should be GET route
router.post("/logout", (req, res) => {
  res.redirect("/index");
});

/*
Main Feed: (/)
Login: (/login)
Admin: (/admin)
My sales
My Ads
Logout
Favourites: (/favourites)
Messaging: (/inbox)
*/
