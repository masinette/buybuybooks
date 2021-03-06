/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// const bodyParser = require("body-parser");
// router.set("view engine", "ejs");
// router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("/index");
});

//LOGIN/LOGOUT ROUTES
//login GET route, render login page with login buttons
router.get("/login", (req, res) => {

  res.render("/user_login");
});


//logout POST route, redirect to main page
//LOGOUT should be GET route
router.post("/logout", (req, res) => {
  res.redirect("/main");
});


//FAVOURITE ROUTES
//favourites GET route
router.get("/favourites", (req, res) => {
  res.render("/favourites");
});
router.post("/favourites", (req, res) => {});


//SALES ROUTES
router.get("/sales", (req, res) => {
  res.render("sales");
});

//if user deletes ad
router.post("/sales/delete", (req, res) => {

  res.redirect("/myads");
});

//if user update ad
router.post("/sales/update",(req, res) => {
  res.redirect(`/${URL}`);
});

//if user posts ad
router.post("/sales/post",(req, res) => {
  res.redirect(`/${URL}`);
});

//MESSAGE ROUTES
router.get("/messages/:id", (req, res) => {

});
router.post("/messages/:id", (req, res) => {
  //AJAX, template for messages, passing in user input as var, and render to page
});


router.get("/myads", (req, res) => {
  res.render();
});
router.post("/myads", (req, res) => {
  //AJAX, template for ads, passin in user input as var, and render to page
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
