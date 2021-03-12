const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const messagesQuery = `SELECT * FROM messages JOIN items ON items.id = item_id`;

    const itemsQuery = `SELECT id, name FROM items`;

    return Promise.all([db.query(messagesQuery), db.query(itemsQuery)])

      //data is an array of the return values from Promise.all
      .then(data => {
        // const templateVars = { messages: data.rows };

        const messages = data[0].rows;
        const items = data[1].rows;
        const templateVars = { messages, items };
        return res.render("messages", templateVars);
      })
      .catch(error => console.log(error));
  });


  router.post("/", (req, res) => {
    const message = req.body.message;
    const item_id = req.body.item;
    const user_id = req.session.user_id;
    const convo_id = req.params.id;

    console.log("REQBODY", req.body);
    console.log(user_id);

    if (!user_id) {
      return res.redirect("/api/users/login");
    }
    // query to get items table
    const sql = `SELECT * FROM items JOIN messages ON items.id = item_id;`;
    db.query(sql)

      .then(data => {
        const sql = `INSERT INTO messages
      (message, sender_id, receiver_id, item_id , date_of_message)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);`;

        return db.query(sql, [message, user_id, 1, item_id])

          .then(data => {
            console.log(sql);
            return res.redirect("/messages");
          })
          .catch(error => console.log(error));
      })

    // const sql = `SELECT sender_id FROM messages WHERE id = $1;`

  });
  // router.get("/messages/:id", (req, res) => {
  //   const templateVars = { items: data.rows, current_user_id: req.session.user_id };
  //   .then(data => {
  //     return res.render(`messages/${items.id}`, templateVars);
  //   })
  //   .catch(error => console.log(error));
  // });

  return router;
};
