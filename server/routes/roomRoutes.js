import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import  {getRooms,getRoom,createRoom,deleteRoom,}  from "../controllers/roomController.js";

const router = Router();

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

export default router;