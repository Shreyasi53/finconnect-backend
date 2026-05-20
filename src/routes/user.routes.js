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
router.route("/follow-advisor/:id").post(verifyJWT, followAdvisor);
router.route("/unfollow-advisor/:id").patch(verifyJWT,unfollowAdvisor)
router.route("/apply-advisor").patch(verifyJWT, applyAdvisor);
export default router;
