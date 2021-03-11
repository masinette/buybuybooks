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
    const sql = `SELECT * FROM items`;

    return db.query(sql)

      .then(data => {
        const user = req.session.user_id;
        if(user) {
          const templateVars = { items: data.rows, current_user_id: user };
          res.render("createad", templateVars);
        } else {
          res.redirect("/api/users/login")
        }
      })
      .catch(error => console.log(error));
  });
  return router;
};
