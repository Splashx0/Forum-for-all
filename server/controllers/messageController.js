import { Room } from "../models/room.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

//Get all messages
export const getMessages = async (req, res) => {
  const messages = await Message.find()
    .populate("user room")
    .sort({ createdAt: -1 });
  res.status(200).json({ messages });
};

//Get all messages of a single room
export const getMessagesOfRoom = async (req, res) => {
  const { id } = req.params;
  const messages = await Message.find({ room: id })
    .populate("user room")
    .sort({ createdAt: -1 });
  res.status(200).json({ messages });
};

//Create a message
export const createMessage = async (req, res) => {
  const { username } = req.user;
  const { id } = req.params;
  const { body } = req.body;
  const user = await User.findOne({ username });

  const message = await Message.create({
    user: user._id,
    body,
    room: id,
  });
  const room = await Room.updateOne(
    { _id: id },
    { $push: { messages: message._id } }
  );

  res.status(200).json({ message });
};

