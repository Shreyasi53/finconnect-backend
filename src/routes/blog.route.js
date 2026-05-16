import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";

import {
   createBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.route("/create").post(
   verifyJWT,
   verifyRole("advisor"),
   createBlog
);

export default router;