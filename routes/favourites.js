const express = require("express");
const router = express.Router();

// module.exports = (db) => {
//   //FAVOURITE ROUTES
//   //favourites GET route
//   router.get("/favourites", (req, res) => {
//     res.render("favourites");
//   });
//   router.post("/favourites", (req, res) => {});

//   return router;
// };

module.exports = (db) => {
  router.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM favourites JOIN items ON item_id = items.id WHERE favourites.id IN (SELECT favourites.id FROM favourites);`;

    db.query(sqlQuery)
      .then((data) => {
        const templateVars = { favourites: data.rows };
        // const templateVars = { favourites:data.rows };
        // console.log("FAVOURITES", templateVars);
        res.render("favourites", templateVars);
      })
      .catch((err) => {
        res.status(!200).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const itemId = req.body.item_id;
    const userId = req.session.user_id;
    console.log(req.session);
    const sql = `INSERT INTO favourites (user_id, item_id) VALUES ($1, $2) RETURNING *;`;
    db.query(sql, [userId, itemId])
      .then((data) => {
        const dataBody = data.rows;
        console.log("DATA", dataBody);

        console.log("UserId ", dataBody[0].user_id);
        res.redirect("/");
      })
      .catch((err) => {
        res.status(!200).json({ error: err.message });
      });
  });

  router.post("/:id/delete", (req, res) => {
    const itemId = req.params.id;
    const sql = `DELETE FROM favourites WHERE item_id = $1;`;
    console.log("this is item", itemId);
    return db
      .query(sql, [itemId])
      .then(() => {
        res.redirect("/favourites");
      })
      .catch((err) => {
        console.log("error", err);
        res.status(302).json({ error: err.message });
      });
  });
  return router;
};
