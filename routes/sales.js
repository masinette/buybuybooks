const express = require("express");
const router = express.Router();

//SALES ROUTES

module.exports = (db) => {
  router.get("/sales", (req, res) => {
    res.render("sales");
  });

  router.post("/createad", (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const user = req.body;

    const sql = `INSERT INTO items (user_id, price, name, description, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    db.query(sql, [user, price, name, description, category, image])
      .then((data) => {
        res.redirect(`/myads`);
      })
      .catch((err) => {
        res.status(!200).json({ error: err.message });
      });
  });
  return router;
};
