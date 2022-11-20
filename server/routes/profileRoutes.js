const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getProfile, editProfile } = require("../controllers/profileController");

//Get profile
router.get("/:id", getProfile);

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
router.post("/:id/edit", upload.single("avatar"), editProfile);

module.exports = router;
