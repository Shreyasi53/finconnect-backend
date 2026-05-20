import { Router } from "express";

import {
  getCurrentUser,
  updateProfile,
  followAdvisor,
  applyAdvisor
} from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfile);
router.route("/follow-advisor/:id").post(verifyJWT, followAdvisor);
router.route("/apply-advisor").patch(verifyJWT, applyAdvisor);
export default router;
