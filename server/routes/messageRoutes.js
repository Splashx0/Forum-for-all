import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import  { getMessages,getMessagesOfRoom,createMessage} from "../controllers/messageController.js";

const router  = Router();

router.get("/", getMessages);
router.get("/:id", getMessagesOfRoom);
router.use(requireAuth);
router.post("/:id", createMessage);

export default router;
