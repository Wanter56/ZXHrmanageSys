const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// 启用跨域中间件，允许前端跨域请求
app.use(cors());
// 解析 JSON 格式的请求体
app.use(express.json());

// 连接 MongoDB 数据库，指定连接的数据库为 staff
mongoose
  .connect("mongodb://localhost:27017/staff", {
    // 新版 MongoDB 驱动已不需要这些旧参数，可删除以消除警告
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ 成功连接到 MongoDB 的 staff 数据库");
  })
  .catch((err) => {
    console.error("❌ MongoDB 数据库连接失败：", err);
  });

// ---------------------- 定义各个集合的数据模型 ----------------------

// 1. accessments 集合模型
const AccessmentSchema = new mongoose.Schema({}, { collection: "accessments", strict: false });
const Accessment = mongoose.model("Accessment", AccessmentSchema);

// 2. attendances 集合模型
const AttendanceSchema = new mongoose.Schema({}, { collection: "attendances", strict: false });
const Attendance = mongoose.model("Attendance", AttendanceSchema);

// 3. deparments 集合模型
const DepartmentSchema = new mongoose.Schema({}, { collection: "deparments", strict: false });
const Department = mongoose.model("Department", DepartmentSchema);

// 4. levels 集合模型
const LevelSchema = new mongoose.Schema({}, { collection: "levels", strict: false });
const Level = mongoose.model("Level", LevelSchema);

// 5. rewardandpunishments 集合模型
const RewardAndPunishmentSchema = new mongoose.Schema({}, { collection: "rewardandpunishments", strict: false });
const RewardAndPunishment = mongoose.model("RewardAndPunishment", RewardAndPunishmentSchema);

// 6. routers 集合模型
const RouterSchema = new mongoose.Schema({}, { collection: "routers", strict: false });
const Router = mongoose.model("Router", RouterSchema);

// 7. salaryadjustments 集合模型
const SalaryAdjustmentSchema = new mongoose.Schema({}, { collection: "salaryadjustments", strict: false });
const SalaryAdjustment = mongoose.model("SalaryAdjustment", SalaryAdjustmentSchema);

// 8. staffs 集合模型
const StaffSchema = new mongoose.Schema({}, { collection: "staffs", strict: false });
const Staff = mongoose.model("Staff", StaffSchema);

// 9. users 集合模型
const UserSchema = new mongoose.Schema({}, { collection: "users", strict: false });
const User = mongoose.model("User", UserSchema);

// ---------------------- 定义各个集合的查询接口 ----------------------

// 1. accessments 集合查询接口
app.get("/api/accessments", async (req, res) => {
  try {
    const data = await Accessment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 2. attendances 集合查询接口
app.get("/api/attendances", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 3. deparments 集合查询接口
app.get("/api/departments", async (req, res) => {
  try {
    const data = await Department.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 4. levels 集合查询接口
app.get("/api/levels", async (req, res) => {
  try {
    const data = await Level.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 5. rewardandpunishments 集合查询接口
app.get("/api/rewardandpunishments", async (req, res) => {
  try {
    const data = await RewardAndPunishment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 6. routers 集合查询接口
app.get("/api/routers", async (req, res) => {
  try {
    const data = await Router.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 7. salaryadjustments 集合查询接口
app.get("/api/salaryadjustments", async (req, res) => {
  try {
    const data = await SalaryAdjustment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 8. staffs 集合查询接口
app.get("/api/staffs", async (req, res) => {
  try {
    const data = await Staff.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// 9. users 集合查询接口
app.get("/api/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

// ---------------------- 启动服务器 ----------------------
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 后端服务已启动，运行在 http://localhost:${port}`);
  console.log("📌 可访问的接口列表：");
  console.log(" - /api/accessments");
  console.log(" - /api/attendances");
  console.log(" - /api/departments");
  console.log(" - /api/levels");
  console.log(" - /api/rewardandpunishments");
  console.log(" - /api/routers");
  console.log(" - /api/salaryadjustments");
  console.log(" - /api/staffs");
  console.log(" - /api/users");
});
