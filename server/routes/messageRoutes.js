const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getMessages,
  getMessagesOfRoom,
  createMessage,
} = require("../controllers/messageController");

//Get all messages
router.get("/", getMessages);

//Get all messages of a single room
router.get("/:id", getMessagesOfRoom);

//auth
router.use(requireAuth);

//Create a message
router.post("/:id", createMessage);

module.exports = router;
