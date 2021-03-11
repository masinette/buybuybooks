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
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM items`;

    return db
      .query(sql)

      .then((data) => {
        const templateVars = {
          items: data.rows,
          current_user_id: req.session.user_id,
        };
        return res.render("myads", templateVars);
      })
      .catch((error) => console.log(error));
  });

  router.post("/:id/delete", (req, res) => {
    const itemId = req.params.id;
    const sql = `DELETE FROM items WHERE id = $1;`;
    console.log("this is item", itemId);
    return db
      .query(sql, [itemId])
      .then(() => {
        console.log("query sql", sql)
        res.redirect("/myads");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(302).json({ error: err.message });
      });
  });

  router.post("/:id/sold", (req, res) => {
    const itemId = req.params.id;
    const sql = `UPDATE items SET sold = true WHERE id = $1;`;
    console.log("this is item", itemId);
    return db
      .query(sql, [itemId])
      .then(() => {
        console.log("query sql", sql)
        res.redirect("/myads");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(302).json({ error: err.message });
      });
  });
  return router;
};
