const express = require("express");
const router = express.Router();
const User = require("../models/user");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");

//router.use(requireAuth);

//Get profile
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ username: id }).populate({
    path: "rooms",
    populate: { path: "topic" },
    options: {
      sort: { createdAt: -1 },
    },
  });
  res.status(200).json({ user });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Edit Profile
router.post("/:id/edit", upload.single("avatar"), async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  const editUser = await User.updateOne(
    { username: id },
    {
      $set: {
        profileImg: req.file.originalname,
        bio,
      },
    }
  );
  res.status(200).json({ editUser });
});

module.exports = router;
