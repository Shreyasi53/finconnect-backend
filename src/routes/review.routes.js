import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
   createReview
} from "../controllers/review.controller.js";

const router = Router();
router.route("/create")
.post(
   verifyJWT,
   createReview
);
export default router;