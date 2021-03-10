const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    console.log("in the messages");
    const sql = `SELECT * FROM messages`;
    const conversationId = req.params.id;
    // console.log("DATABASE", db);

    return db.query(sql)
      // .then((data) => {
      //   //insert template vars for messages
      // res.render("messages", );
      // });
      .then(data => {
        console.log("in the messages");

        return res.render("messages");


      })
      .catch(error => console.log(error));

  });

  // router.post("/messages", (req, res) => {
  //   res.render("messages");
  //   //AJAX, template for messages, passing in user input as var, and render to page
  // });
  /*
   module.exports = (db) => {
     router.get("/messages/:id", (req,res) =>
     const sql = "SELECT * FROM messages WHERE message_id = $1";
     const messageId = req.params.id;
     const params = [messageId]
     db.query(sql, params)
     .then(data => {
       const templateVars = { messages: data.rows, messageId: messageId }
      console.log("msgs", templateVars.messages)
      res.render("messages", templateVars);
      })
     )};

     router.post("/:id", (req, res) => {
       const msg = req.body.message;
       const sender = req.session.user_id;

       const sql1 = "SELECT from_user FROM messages WHERE id = $1";
       const conversaion = req.params.id;

       db.query(sql1, [conversation]);
       .then(data => {

        const buyerId = data.rows[0].from_user;
        let fromBuyer = false
        console.log("sender", sender)
        console.log("buyer", buyerId)

        if

       })
      })
  */
  return router;
};
