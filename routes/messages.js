const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/messages", (req, res) => {
    const sql = `SELECT * FROM messages WHERE conversation_id = $1`;
    const conversationId = req.params.id;
    //console.log

    db.query(sql, [conversationId]).then((data) => {
      //insert template vars for messages
      res.render("messages");
    });
  });

  // router.post("/messages", (req, res) => {
  //   res.render("messages");
  //   //AJAX, template for messages, passing in user input as var, and render to page
  // });
  return router;
};
