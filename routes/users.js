/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        console.log(users)
        data = req.body;
        res.render("index", data);
        // res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //LOGIN/LOGOUT ROUTES
  //login GET route, render login page with login buttons
  router.get("/login/:id", (req, res) => {
    console.log("id", req.params.id);
    req.session = req.params;
    res.redirect("/");
  });
  router.get("/login", (req, res) => {
    // const userId = req.session;
    // const templateVars = { user: users[userId] };, templateVars)
    res.render("user_login");
    res.redirect(`/`);
    // // const templateVars = { user: users[user_id] };, templateVars)
    // res.render("user_login");
  });


  //logout POST route, redirect to main page
  router.post("/login", (req, res) => {
    let user = req.body.username;
    console.log("username", user);
    req.session = user;

    const queryString = `SELECT * FROM users WHERE name = $1;`;
    db.query(queryString, [user])
      .then((results) => {
        console.log("results", results.rows);
        if (results.rows.length > 0) {
          res.redirect("/");
        } else {
          res.end("Error");
        }
      })
      .catch((err) => {
        console.log("query error:", err);
      });
  });

  //LOGOUT should be GET route
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};

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
