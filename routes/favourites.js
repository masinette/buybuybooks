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
};
