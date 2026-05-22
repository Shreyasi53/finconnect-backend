import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import advisorRoutes from "./routes/advisor.routes.js";
import blogRoutes from "./routes/blog.route.js";
import bookingRoutes from "./routes/booking.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/advisors", advisorRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/notifications", notificationRoutes);

export default app;