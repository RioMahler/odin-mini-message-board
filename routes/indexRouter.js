const { Router } = require("express");
const {
  getMessages,
  createMessagesPost,
  getIndividualMessage,
} = require("../controllers/usersController");

const indexRouter = Router();

indexRouter.get("/", getMessages);

indexRouter.get("/new", (req, res) => {
  res.render("new");
});

indexRouter.post("/new", createMessagesPost);

indexRouter.get("/:postId", getIndividualMessage);

module.exports = indexRouter;
