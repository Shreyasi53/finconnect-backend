import { Router } from "express";
import {
  getAllUsers,
  getPendingAdvisors,
  approveAdvisor,
} from "../controllers/admin.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";

const router = Router();

router.route("/all-users").get(verifyJWT, verifyRole("admin"), getAllUsers);
router.route("/pending-advisors").get(verifyJWT, verifyRole("admin"), getPendingAdvisors);
router.route("/approve-advisor/:id").patch(verifyJWT, verifyRole("admin"), approveAdvisor);

export default router;
