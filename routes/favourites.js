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
      .then(data => {
        const templateVars = { items: data.rows };
        res.render("favourites", templateVars);
      })
      .catch(err => {
        res.status(!200).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const itemId = req.body.item_Id;
    const userId = req.session.user_id;
    console.log("ItemID: ", itemId);
    console.log("UserId ", userId);
    const sql = `INSERT INTO favourites (userId, itemId) VALUES ($1, $2) RETURNING *;`
    db.query(sql, [userId, itemId])
      .then(data => {
        res.redirect("/")
      })
      .catch(err => {
        res.status(!200).jason({ error: err.message });
      });
  });
  /*
    router.post("/delete", (req, res) => {
      const itemId = req.body.itemId;
      const userId = req.session.user_id;
      const sql = `DELETE FROM favourites WHERE user_id = $1 AND item_id = $2 RETURNING *`
      db.query(sql, [userId, itemId])
      .then(data => {
        res.redirect("/")
      })
      .catch(err => {
        res.status(!200).json({error: errmessage});
      })
    })
  */
  return router;
};
