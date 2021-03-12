const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");

module.exports = (db) => {
  //MESSAGE ROUTES
  // need to add messages and conversation_id to ERD
  router.get("/", (req, res) => {
    const sqlQuery = `SELECT * FROM messages JOIN users ON users.id = sender_id WHERE messages.sender_id IN (SELECT messages.sender_id FROM messages WHERE sender_id = $1);`;

    db.query(sqlQuery)
      .then((data) => {
        console.log("DATA", data.rows)
        const templateVars = { messages: data.rows };
        res.render("messages");
      })
      .catch((err) => {
        res.status(!200).json({ error: err.message });
      });

    // const messagesQuery = `SELECT * FROM messages JOIN items ON items.id = item_id;`;
    // const itemsQuery = `SELECT id, name FROM items;`;
    // const usersQuery = `SELECT * FROM users;`;
    // return Promise.all([db.query(messagesQuery), db.query(itemsQuery)])
    //   //data is an array of the return values from Promise.all
    //   .then(data => {
    //     console.log("DATA RESULTS", data)
    //     // const templateVars = { messages: data.rows };
    //     const messages = data[0].rows;
    //     console.log("messages RESULTS", messages)
    //     const items = data[1].rows;
    //     console.log("items RESULTS", items)
    //     const templateVars = { messages, items };
    //     console.log("items table", data[1])
    //     return res.render("messages", templateVars);
    //   })
    //   .catch(error => console.log(error));
  });

  router.post("/", (req, res) => {
    const message = req.body.message;
    const item_id = req.body.item;
    const convo_id = req.params.id;

    // query to get items table
    const sql = `SELECT * FROM items JOIN messages ON items.id = item_id;`;
    db.query(sql)
      .then(data => {


        const name = req.body.name;
        const price = req.body.item_price;
        const image = req.body.image_url;
        const description = req.body.item_description
        const id = req.params.id;

        const sql = `UPDATE items SET name = $3, image_url = $5, price = $2, description = $4 WHERE id = $1;`;
    db.query(sql, [id, price, name, description, image])

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
