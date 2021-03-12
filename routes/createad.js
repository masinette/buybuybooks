const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM items`;

    return db
      .query(sql)

      .then((data) => {
        const user = req.session.user_id;
        if (user) {
          const templateVars = { items: data.rows };
          res.render("createad", templateVars);
        } else {
          res.redirect("/login");
        }
      })
      .catch((error) => console.log(error));
  });

  router.post("/", (req, res) => {
    const name = req.body.name;
    // const category = req.body.category;
    const price = req.body.item_price;
    const image = req.body.image_url;
    const description = req.body.item_description;
    const user = req.session.user_id;

    const sql = `INSERT INTO items (creator_id, price, name, description, image_url) SELECT users.id, $2, $3, $4, $5 FROM users WHERE name = $1 RETURNING *;`;
    db.query(sql, [user, price, name, description, image])
      .then((data) => {
        res.redirect(`/myads`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
