import { Router } from "express";
import { registerUser, loginUser, getCurrentUser, getAllUsers } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/all-users").get(verifyJWT, verifyRole("admin"), getAllUsers);

export default router;