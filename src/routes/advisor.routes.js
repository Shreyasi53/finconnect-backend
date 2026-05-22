import { Router } from "express";

import {
   getAllAdvisors,
   getAdvisorProfile,
   searchAdvisors
} from "../controllers/advisor.controller.js";

const router = Router();

router.route("/advisors").get(getAllAdvisors);
router.route("/search").get(searchAdvisors);
router.route("/:id").get(getAdvisorProfile);

export default router;