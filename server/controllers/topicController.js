const Topic = require("../models/topic");

//GET topics
const getTopics = async (req, res) => {
  const topics = await Topic.find();
  res.status(200).json({ topics });
};

//Create topic
const createTopic = async (req, res) => {
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

module.exports = { getTopics, createTopic };
