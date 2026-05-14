import { Router } from "express";

import {
   getAllAdvisors
} from "../controllers/advisor.controller.js";

const router = Router();

router.route("/advisors").get(
   getAllAdvisors
);

export default router;