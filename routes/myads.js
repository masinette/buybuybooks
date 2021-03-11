const express = require("express");
const router = express.Router();

// router.get("/myads", (req, res) => {
//   res.render("myads");
// });

// router.post("/myads", (req, res) => {
//   //AJAX, template for ads, passin in user input as var, and render to page
// });

// module.exports = router;

// module.exports = (db) => {
//   router.get("/sales", (req, res) => {
//     res.render("sales");
//   });

module.exports = (db) => {
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

module.exports = (db) => {
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM items`;

    return db
      .query(sql)

      .then((data) => {
        const templateVars = { items: data.rows };
        return res.render("myads", templateVars);
      })
      .catch((error) => console.log(error));
  });
  return router;
};

module.exports = (db) => {
  router.get("/postad", (req, res) => {
    res.render("postad");
  });
  return router;
};
