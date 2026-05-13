import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    getCurrentUser,
    getAllUsers,
    getPendingAdvisors,
    approveAdvisor,
    updateProfile,
    getAllAdvisors
 } from "../controllers/user.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/role.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/all-users").get(verifyJWT, verifyRole("admin"), getAllUsers);
router.route("/pending-advisors").get(verifyJWT, verifyRole("admin"), getPendingAdvisors);
router.route("/approve-advisor/:id").patch(verifyJWT, verifyRole("admin"), approveAdvisor);
router.route("/update-profile").patch(verifyJWT, updateProfile);
router.route("/advisors").get(getAllAdvisors);

export default router;