const express = require("express");
const Room = require("../models/room");
const User = require("../models/user");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Topic = require("../models/topic");
const mongoose = require("mongoose");
const Message = require("../models/message");

//Get all rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find()
    .populate("host topic messages")
    .sort({ createdAt: -1 });
  res.status(200).json({ rooms });
});
///get a specific room
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id).populate("host topic");
  if (!room) {
    res.status(404).json({ error: "No such a room" });
  }
  res.status(200).json({ room });
});
router.use(requireAuth);

//Create a new room
router.post("/", async (req, res) => {
  const host = req.user.username;
  const { name, description, topic } = req.body;
  const hostUser = await User.findOne({ username: host });

  const topicRequested = await Topic.findOne({ name: topic });
  const room = await Room.create({
    name,
    description,
    topic: topicRequested._id,
    host: hostUser._id,
    messages: [],
  });
  const topicUpdated = await Topic.updateOne(
    { name: topic },
    { $push: { rooms: room._id } }
  );

  const user = await User.updateOne(
    { username: host },
    {
      $push: { rooms: room.id },
    }
  );
  res.status(200).json({ room });
});
////Delete a room
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a room" });
  }
  const room = await Room.findByIdAndDelete({ _id: id });

  await Topic.updateOne({ _id: room.topic }, { $pull: { rooms: room._id } });
  const messages = await Message.find({ room: room._id }).remove();
  if (!room) {
    return res.status(400).json({ error: "Not a room" });
  }

  res.status(200).json(room);
});

module.exports = router;
