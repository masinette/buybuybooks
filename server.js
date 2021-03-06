// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["hbefv8g4t83btv", "jkfbcibe8y35"],
  })
);

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
console.log("connecting to db");
db.connect()
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error.message));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const favouritesRoutes = require("./routes/favourites");
const messagesRoutes = require("./routes/messages");
const salesRoutes = require("./routes/sales");
const myAds = require("./routes/myads");
const createad = require("./routes/createad");
app.use((req, res, next) => {
  if (req.session) {
    res.locals.current_user_id = req.session.user_id;
    res.locals.current_username = req.session.username;
  }
  next();
});
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/favourites", favouritesRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/myads", myAds(db));
app.use("/sales", salesRoutes(db));
app.use("/createad", createad(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const sortDirection = req.query.q;
  db.query(`SELECT * FROM items;`)
    .then((data) => {
      function itemsSorter(sortingDir, rows) {
        if (sortingDir == "asc") {
          return rows.sort((a, b) => a.price - b.price);
        }
        if (sortingDir == "desc") {
          return rows.sort((a, b) => b.price - a.price);
        }
        return rows;
      }
      // data = req.body;
      // console.log("DATA", data.rows)
      const templateVars = {
        items: itemsSorter(sortDirection, data.rows),
        current_user_id: req.session.user_id,
      };
      // console.log("req session", req.session.user_id);
      // console.log("data row info", data.rows);
      res.render("index", templateVars);
    })
    .catch((error) => console.log(error.message));
});

// app.get("/:sortDir", (req, res) => {
//   const sortingDir = req.query.sortDir;
//   console.log("sorting dir", sortingDir);
//   db.query(`SELECT * FROM items;`)
//     .then((data) => {
//       console.log("items sorter", itemsSorter(sortingDir, rows));
//       // data = req.body;
//       // console.log("DATA", data.rows)
//       const templateVars = {
//         items: itemsSorter(sortingDir, data.rows),
//         current_user_id: req.session.user_id,
//       };
//       // console.log("req session", req.session.user_id);
//       // console.log("data row info", data.rows);
//       res.render("index", templateVars);
//     })
//     .catch((error) => console.log(error.message));
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
