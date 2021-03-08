const express = require("express");
const router = express.Router();

//SALES ROUTES
router.get("/mysales", (req, res) => {
  res.render("sales");
});

module.exports = router;






// //if user deletes ad
// router.post("/sales/delete", (req, res) => {
//   res.redirect("/myads");
// });
//if user update ad
// router.post("/sales/update", (req, res) => {
//   res.redirect(`/${URL}`);
// });
// //if user posts ad
// router.post("/sales/post", (req, res) => {
//   res.redirect(`/${URL}`);
// });
