import { Topic } from "../models/topic.js";

//GET topics
export const getTopics = async (req, res) => {
  const topics = await Topic.find().populate("rooms");
  res.status(200).json({ topics });
};

//Create topic
export const createTopic = async (req, res) => {
  const { name } = req.body;
  try {
    const topic = await Topic.create({
      name,
      rooms: [],
    });
    res.status(200).json({ topic });
  } catch (error) {
    res.status(400).json({ error });
  }
};
