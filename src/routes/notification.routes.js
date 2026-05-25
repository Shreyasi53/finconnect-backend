import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getNotifications, markAsRead} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", verifyJWT, getNotifications);
router.route("/read/:id").patch(verifyJWT, markAsRead);
export default router;