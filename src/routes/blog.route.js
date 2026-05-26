import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";

import {
   createBlog,
   getAllBlogs,
   getSingleBlog,
   likeBlog,
   commentOnBlog,
   shareBlog,
   updateBlog,
   deleteBlog,
   getMyBlogs
} from "../controllers/blog.controller.js";

const router = Router();
/**
 * @swagger
 * /api/v1/blogs/create:
 *   post:
 *     summary: Create Blog
 *     tags: [Blogs]
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.route("/create").post(verifyJWT, verifyRole("advisor"),createBlog);
router.route("/").get(getAllBlogs);
router.route("/my-blogs").get(verifyJWT, verifyRole("advisor"), getMyBlogs);
router.route("/:id").get(getSingleBlog);
/**
 * @swagger
 * /api/v1/blogs/like/{id}:
 *   patch:
 *     summary: Like or Unlike a Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog liked successfully
 */
router.route("/like/:id").patch(verifyJWT, likeBlog);
/**
 * @swagger
 * /api/v1/blogs/comment/{id}:
 *   post:
 *     summary: Comment on a Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Comment added successfully
 */
router.route("/comment/:id").post(verifyJWT, commentOnBlog);
/**
 * @swagger
 * /api/v1/blogs/share/{id}:
 *   patch:
 *     summary: Share a Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog shared successfully
 */
router.route("/share/:id").patch(verifyJWT, shareBlog);
router.route("/update/:id").patch(verifyJWT, verifyRole("advisor"), updateBlog);
router.route("/delete/:id").delete(verifyJWT, verifyRole("advisor"), deleteBlog);

export default router;