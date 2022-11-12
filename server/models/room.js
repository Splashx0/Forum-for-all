const mongoose = require("mongoose");
const Topic = require("./topic");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema); // pluriel and search for it in db
module.exports = Room;
