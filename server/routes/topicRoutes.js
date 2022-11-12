const express = require("express");
const Topic = require("../models/topic");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//GET topics
router.get("/", async (req, res) => {
  const topics = await Topic.find();
  res.status(200).json({ topics });
});

//ADD topics
router.post("/", async (req, res) => {
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
});

module.exports = router;
