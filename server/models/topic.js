const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
      },
    ],
  },
  { timestamps: true }
);

const Topic = mongoose.model("topic", topicSchema); // pluriel and search for it in db
module.exports = Topic;
