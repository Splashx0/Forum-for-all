import mongoose from "mongoose";
import mongooseDateFormat from "mongoose-date-format";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    body: {
      type: String,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
  },
  { timestamps: true }
);
messageSchema.plugin(mongooseDateFormat); // format: YYYY-MM-DD HH:mm:ss

export const Message = mongoose.model("message", messageSchema); // pluriel and search for it in db


