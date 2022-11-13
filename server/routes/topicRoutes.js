const express = require("express");
const router = express.Router();
const { getTopics, createTopic } = require("../controllers/topicController");
//GET topics
router.get("/", getTopics);

//CREATE topic
router.post("/", createTopic);

module.exports = router;
