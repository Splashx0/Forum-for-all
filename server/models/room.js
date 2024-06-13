import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongooseDateFormat from "mongoose-date-format";

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
roomSchema.plugin(mongooseDateFormat);

export const Room = mongoose.model("room", roomSchema); // pluriel and search for it in db
