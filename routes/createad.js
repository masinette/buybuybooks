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
    const sql = `SELECT * FROM messages
    JOIN items ON items.id = item_id
    `;

    return db.query(sql)

      .then(data => {
        const templateVars = { messages: data.rows, current_user_id: req.session.user_id };
        return res.render("createad", templateVars);

      })
      .catch(error => console.log(error));

  });

  return router;
};
