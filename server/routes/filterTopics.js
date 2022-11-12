const express = require("express");
const Topic = require("../models/topic");
const router = express.Router();

//Get all messages in the room

router.get("/topic", async (req, res) => {
  const { name } = req.query;
  const topic = await Topic.find({ name });
  res.status(200).json({ topic });
});

module.exports = router;
