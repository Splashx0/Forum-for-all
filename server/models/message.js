const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDateFormat = require("mongoose-date-format");

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

const Message = mongoose.model("message", messageSchema); // pluriel and search for it in db
module.exports = Message;
