import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";

import {
   createBlog,
   getAllBlogs,
   getSingleBlog,
   likeBlog,
   commentOnBlog
} from "../controllers/blog.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, verifyRole("advisor"),createBlog);
router.route("/").get(getAllBlogs);
router.route("/:id").get(getSingleBlog);
router.route("/like/:id").patch(verifyJWT, likeBlog);
router.route("/comment/:id").post(verifyJWT, commentOnBlog);

export default router;