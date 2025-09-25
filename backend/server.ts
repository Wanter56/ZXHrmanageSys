const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// 若开发期用 Vite 代理到 /api 和 /staff，可不启用 CORS；如果前端直连就启用：
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

require("./config/db");

// 登录/会话
app.use("/api", require("./routes/authRoutes"));

// server.js / app.js —— 挂 /api 路由之前
app.set("etag", false); // 全局关闭 etag（可选）
app.use("/api", (req: any, res: any, next: any) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

// 然后再
app.use("/api", require("./routes/authRoutes"));

// 业务路由（统一保护）
const requireAuth = require("./utils/requireAuth");
app.use("/staff", requireAuth, require("./routes/accessmentRoutes"));
app.use("/staff", requireAuth, require("./routes/attendanceRoutes"));
app.use("/staff", requireAuth, require("./routes/departmentRoutes"));
app.use("/staff", requireAuth, require("./routes/levelRoutes"));
app.use("/staff", requireAuth, require("./routes/rewardAndPunishmentRoutes"));
app.use("/staff", requireAuth, require("./routes/routerRoutes"));
app.use("/staff", requireAuth, require("./routes/salaryAdjustmentRoutes"));
app.use("/staff", requireAuth, require("./routes/userRoutes"));
app.use("/staff", requireAuth, require("./routes/analyzeStaffRoutes"));
app.use("/staff", requireAuth, require("./routes/studentRoutes"));

const port = 3000;
app.listen(port, () => {
  console.log(`backend: http://localhost:${port}`);
});
