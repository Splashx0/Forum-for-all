const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
//const requireAuth = require("../middleware/requireAuth");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id, username) => {
  return jwt.sign({ _id, username }, "splash secret", {
    expiresIn: maxAge,
  });
};
//register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.register(username, email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.userrame, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/api/users", async (req, res) => {
  const users = await User.find().populate("rooms");
  res.json({ users });
});

module.exports = router;
