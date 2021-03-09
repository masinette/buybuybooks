const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to DB
  router.get("/conversations", (req, res) => {
    const sql = `SELECT * FROM messages WHERE conversation_id = $1`;
    const conversationId = req.params.id;

    db.query(sql, [conversationId]).then((data) => {
      //insert template vars
      res.render("messages");
    });
  });

  router.post("/messages", (req, res) => {
    res.render("messages");
    //AJAX, template for messages, passing in user input as var, and render to page
  });
  return router;
};
