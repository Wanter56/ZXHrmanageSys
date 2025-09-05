const express = require("express");
const cors = require("cors");
const app = express();

// 1. 加载中间件
app.use(cors());
app.use(express.json());

// 2. 连接数据库（引入配置）
require("./config/db");

// 3. 引入所有路由（按模块引入）
const accessmentRoutes = require("./routes/accessmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const levelRoutes = require("./routes/levelRoutes");
const rewardAndPunishmentRoutes = require("./routes/rewardAndPunishmentRoutes");
const routerRoutes = require("./routes/routerRoutes");
const salaryAdjustmentRoutes = require("./routes/salaryAdjustmentRoutes");
const userRoutes = require("./routes/userRoutes");
const analyzeStaffRoutes = require("./routes/analyzeStaffRoutes");
const studentRoutes = require("./routes/studentRoutes");

// 4. 注册路由（统一加 /staff 前缀，保持原有接口路径）
app.use("/staff", accessmentRoutes);
app.use("/staff", attendanceRoutes);
app.use("/staff", departmentRoutes);
app.use("/staff", levelRoutes);
app.use("/staff", rewardAndPunishmentRoutes);
app.use("/staff", routerRoutes);
app.use("/staff", salaryAdjustmentRoutes);
app.use("/staff", userRoutes);
app.use("/staff", analyzeStaffRoutes);
app.use("/staff", studentRoutes);

// 5. 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 后端服务已启动，运行在 http://localhost:${port}`);
  console.log("📌 接口前缀统一为：/staff（如 /staff/students）");
});