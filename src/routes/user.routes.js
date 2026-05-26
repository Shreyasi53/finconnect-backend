import { Router } from "express";

import {
  getCurrentUser,
  updateProfile,
  followAdvisor,
  unfollowAdvisor,
  applyAdvisor
} from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfile);
/**
 * @swagger
 * /api/v1/users/follow-advisor/{id}:
 *   post:
 *     summary: Follow an Advisor
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advisor ID
 *     responses:
 *       200:
 *         description: Advisor followed successfully
 */
router.route("/follow-advisor/:id").post(verifyJWT, followAdvisor);

/**
 * @swagger
 * /api/v1/users/unfollow-advisor/:id:
 *   patch:
 *     summary: Unfollow an Advisor
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Advisor ID
 *     responses:
 *       200:
 *         description: Advisor unfollowed successfully
 */
router.route("/unfollow-advisor/:id").patch(verifyJWT,unfollowAdvisor)
/**
 * @swagger
 * /api/v1/users/apply-advisor:
 *   patch:
 *     summary: Apply to become an Advisor
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Application submitted successfully
 */
router.route("/apply-advisor").patch(verifyJWT, applyAdvisor);
export default router;
