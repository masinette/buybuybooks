const express = require("express");
const router = express.Router();

//SALES ROUTES



module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM items JOIN messages ON items.id = messages.item_id JOIN users ON buyer_id = users.id;`;

    return db.query(sql)

      .then(data => {
        const templateVars = { items:data.rows, current_user_id: req.session.user_id};
        // console.log("ITEMS", templateVars)
        return res.render("sales", templateVars);
      })
      .catch(error => console.log(error));

  });
  return router;
};

