const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const sql = `SELECT * FROM messages
    JOIN items ON items.id = item_id
    `;

    return db.query(sql)

      .then(data => {
        const templateVars = { messages: data.rows }
        return res.render("messages", templateVars);

      })
      .catch(error => console.log(error));

  });
  return router;
};



