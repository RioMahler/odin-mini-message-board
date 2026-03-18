const populateDB = require("../db/createTable");
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 255 characters.";
const validateUser = [
  body("username")
    .trim()
    .isAlpha()
    .withMessage(`username ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`username ${lengthErr}`),
  body("message")
    .trim()
    .isLength({ max: 200 })
    .withMessage(`Message ${lengthErr}`),
];

async function getMessages(req, res) {
  populateDB();
  const messages = await db.getAllMessages();
  res.render("index", { messages });
  console.log(messages);
}

const createMessagesPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { username, message } = matchedData(req);
    await db.insertMessages(username, message);
    res.redirect("/");
  },
];

async function getIndividualMessage(req, res) {
  const { postId } = req.params;
  const messages = await db.getAllMessages();
  res.render("post", { post: messages[postId] });
}

module.exports = { getMessages, createMessagesPost, getIndividualMessage };
