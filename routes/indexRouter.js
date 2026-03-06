const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("new");
});

indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/:postId", (req, res) => {
  const { postId } = req.params;
  res.render("post", { post: messages[postId] });
});

module.exports = indexRouter;
