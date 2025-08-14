const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// ==========================
// 关键修改：连接到 staff 数据库
// ==========================
mongoose
  .connect("mongodb://localhost:27017/staff", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB 已成功连接到 staff 数据库"))
  .catch((err) => console.error("❌ MongoDB 连接失败:", err));

// 数据模型定义（员工/用户数据结构）
const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 姓名（必填）
  age: { type: Number, min: 18, max: 120 }, // 年龄（限制范围）
  email: { type: String, required: true, unique: true }, // 邮箱（必填且唯一）
  department: String, // 部门
  position: String, // 职位
  hireDate: { type: Date, default: Date.now }, // 入职日期（默认当前时间）
});

// 创建数据模型（对应 staff 数据库中的 staffs 集合）
const Staff = mongoose.model("Staff", StaffSchema);

// ==========================
// API 接口定义
// ==========================

// 1. 根路径提示
app.get("/", (req, res) => {
  res.send(`
    <h1>员工管理系统后端服务</h1>
    <p>数据库连接：mongodb://localhost:27017/staff</p>
    <p>可用接口：</p>
    <ul>
      <li>GET /api/staff - 获取所有员工数据</li>
      <li>GET /api/staff/:id - 获取单个员工数据</li>
      <li>POST /api/staff - 添加新员工</li>
      <li>PUT /api/staff/:id - 更新员工信息</li>
      <li>DELETE /api/staff/:id - 删除员工</li>
    </ul>
  `);
});

// 2. 获取所有员工
app.get("/api/staff", async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ message: "获取员工列表失败：" + err.message });
  }
});

// 3. 获取单个员工
app.get("/api/staff/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "未找到该员工" });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "获取员工数据失败：" + err.message });
  }
});

// 4. 添加新员工
app.post("/api/staff", async (req, res) => {
  const staff = new Staff({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    department: req.body.department,
    position: req.body.position,
    hireDate: req.body.hireDate || Date.now(),
  });

  try {
    const newStaff = await staff.save();
    res.status(201).json(newStaff); // 201 表示创建成功
  } catch (err) {
    // 处理邮箱重复等验证错误
    res.status(400).json({ message: "添加员工失败：" + err.message });
  }
});

// 5. 更新员工信息
app.put("/api/staff/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "未找到该员工" });
    }

    // 更新字段（仅更新前端传递的字段）
    if (req.body.name) staff.name = req.body.name;
    if (req.body.age) staff.age = req.body.age;
    if (req.body.email) staff.email = req.body.email;
    if (req.body.department) staff.department = req.body.department;
    if (req.body.position) staff.position = req.body.position;
    if (req.body.hireDate) staff.hireDate = req.body.hireDate;

    const updatedStaff = await staff.save();
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: "更新员工失败：" + err.message });
  }
});

// 6. 删除员工
app.delete("/api/staff/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "未找到该员工" });
    }

    await staff.deleteOne();
    res.json({ message: "员工已成功删除" });
  } catch (err) {
    res.status(500).json({ message: "删除员工失败：" + err.message });
  }
});

// 启动服务器
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 后端服务已启动，运行在 http://localhost:${port}`);
  console.log(`📦 连接的数据库：mongodb://localhost:27017/staff`);
});
