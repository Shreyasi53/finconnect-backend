import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getNotifications, markAsRead} from "../controllers/notification.controller.js";

const router = Router();
/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get Notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get("/", verifyJWT, getNotifications);
router.route("/read/:id").patch(verifyJWT, markAsRead);
export default router;