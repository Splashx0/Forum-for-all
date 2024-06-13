import mongoose from "mongoose";
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

export const Topic = mongoose.model("topic", topicSchema); // pluriel and search for it in db
