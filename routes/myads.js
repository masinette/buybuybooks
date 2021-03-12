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
    // console.log("sesion", req.session)
    const sql = `SELECT * FROM items where creator_id = $1;`;

    return db
      .query(sql, [req.session.user_id])

      .then((data) => {
        const templateVars = { items: data.rows };
        return res.render("myads", templateVars);
      })
      .catch((error) => console.log(error));
  });

  router.post("/:id/delete", (req, res) => {
    const itemId = req.params.id;
    const sql = `DELETE FROM items WHERE id = $1;`;
    // console.log("this is item", itemId);
    return db
      .query(sql, [itemId])
      .then(() => {
        res.redirect("/myads");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(302).json({ error: err.message });
      });
  });

  router.get("/:id/edit", (req, res) => {
    // 1. Get exciting data for the ad with id
    const sql = `SELECT * FROM items WHERE id = $1;`;
    db.query(sql, [req.params.id])
      .then((data) => {
        // console.log(data.rows[0])
        res.render("editad", { item: data.rows[0] })
      // 2. Pass the exciting data into the template
      // 3. In the template render an input for each data that can be changed
      // 4. In the template render a button, that can post to the /myads/:id/edit
      })
  });
  router.post("/:id/edit", (req, res) => {
    const name = req.body.name;
    const price = req.body.item_price;
    const image = req.body.image_url;
    const description = req.body.item_description;
    const user = req.session.user_id;
    const id = req.params.id;

    const sql = `UPDATE items SET name = $3, image_url = $5, price = $2, description = $4 WHERE id = $1;`;
    db.query(sql, [id, price, name, description, image])
      .then((data) => {
        res.redirect(`/myads`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.post("/:id/edit", (req, res) => {
  //   const name = req.body.name;
  //   const price = req.body.item_price;
  //   const image = req.body.image_url;
  //   const description = req.body.item_description;
  //   const user = req.session.user_id;

  //   const sql = `UPDATE items SET name = ${name}, image_url = ${image}, price = ${price}, description = ${description} WHERE id = $1;`;
  //   return db
  //     .query(sql, [user, price, name, description, image])
  //     .then(() => {
  //       res.redirect("/myads");
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //       res.status(302).json({ error: err.message });
  //     });
  // });

  router.post("/:id/sold", (req, res) => {
    const itemId = req.params.id;
    const sql = `UPDATE items SET sold = true WHERE id = $1;`;
    return db
      .query(sql, [itemId])
      .then(() => {
        res.redirect("/myads");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(302).json({ error: err.message });
      });
  });
  return router;
};
