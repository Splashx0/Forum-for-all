import { Router } from "express";
import multer from "multer";
import { getProfile, editProfile }  from "../controllers/profileController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const router =Router();

//Get profile
router.get("/:id", getProfile);

//Edit Profile
router.post("/:id/edit", upload.single("avatar"), editProfile);

export default router;
