import { Router } from "express";

import {
   getAllAdvisors,
   getAdvisorProfile
} from "../controllers/advisor.controller.js";

const router = Router();

router.route("/advisors").get(getAllAdvisors);
router.route("/:id").get(getAdvisorProfile);

export default router;