import { Router } from "express";

import {
  getCurrentUser,
  updateProfile,
  followAdvisor,
} from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfile);
router.route("/follow-advisor/:id").post(verifyJWT, followAdvisor);

export default router;
