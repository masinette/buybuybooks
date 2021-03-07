//MESSAGE ROUTES
router.get("/messages", (req, res) => {
  res.render("messages");
});

router.post("/messages", (req, res) => {
  res.render("../views/messages");
  //AJAX, template for messages, passing in user input as var, and render to page
});
