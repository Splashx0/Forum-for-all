const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
} = require("../controllers/roomController");
//Get all rooms
router.get("/", getRooms);
///get a specific room
router.get("/:id", getRoom);

//auth
router.use(requireAuth);

//Create a new room
router.post("/", createRoom);

////Delete a room
router.delete("/:id", deleteRoom);

module.exports = router;
