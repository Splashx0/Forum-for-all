import { Room } from "../models/room.js";
import { User } from "../models/user.js";
import { Topic } from "../models/topic.js";
import { Message } from "../models/message.js";
import mongoose from "mongoose";

//GET all rooms
export const getRooms = async (req, res) => {
  const rooms = await Room.find()
    .populate("host topic messages")
    .sort({ createdAt: -1 });
  res.status(200).json({ rooms });
};

///GET a single room
export const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id).populate("host topic");
  if (!room) {
    res.status(404).json({ error: "No such a room" });
  }
  res.status(200).json({ room });
};

//Create a new room
export const createRoom = async (req, res) => {
  const host = req.user.username;
  const { name, description, topic } = req.body;
  const hostUser = await User.findOne({ username: host });
  const topicRequested = await Topic.findOne({ name: topic });
  try {
    if (!name || !description || !topic) {
      throw Error("All fields must be filled ! ");
    }
    if (!topicRequested) {
      throw Error("Please choose a topic from the list !  ");
    }
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
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
////DELETE a room
export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a room" });
  }
  const room = await Room.findByIdAndDelete({ _id: id });

  await Topic.updateOne({ _id: room?.topic }, { $pull: { rooms: room._id } });
  const messages = await Message.find({ room: room._id }).deleteMany();
  if (!room) {
    return res.status(400).json({ error: "Not a room" });
  }

  res.status(200).json(room);
};
