const populateDB = require("../db/createTable");
const db = require("../db/queries");

async function getMessages(req, res) {
  populateDB();
  const messages = await db.getAllMessages();
  res.render("index", { messages });
  console.log(messages);
}

async function createMessagesPost(req, res) {
  const { username, message } = req.body;
  await db.insertMessages(username, message);
  res.redirect("/");
}

async function getIndividualMessage(req, res) {
  const { postId } = req.params;
  const messages = await db.getAllMessages();
  res.render("post", { post: messages[postId] });
}

module.exports = { getMessages, createMessagesPost, getIndividualMessage };
