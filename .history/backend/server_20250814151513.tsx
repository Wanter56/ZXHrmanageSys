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
  .connect("mongodb://localhost:27017/staff", {})
  .then(() => {
    console.log("✅ 成功连接到 MongoDB 的 staff 数据库");
  })
  .catch((err) => {
    console.error("❌ MongoDB 数据库连接失败：", err);
  });
const AccessmentSchema = new mongoose.Schema(
  {
    assessmentScore: Number,
    currentLevel: String,
    date: Date,
    initLevel: String,
    quarterly: Number,
    result: String,
    staffName: String,
    standardScore: Number,
    // 如果还有其他字段，可继续在此处添加
  },
  {
    collection: "accessments", // 明确指定集合名称为 accessments
    strict: false, // 允许集合中存在模型未定义的额外字段
  }
);

const Accessment = mongoose.model("Accessment", AccessmentSchema);

// 定义 API 接口，用于获取 accessments 集合中的所有数据
app.get("/api/accessments", async (req, res) => {
  try {
    // 查询 accessments 集合中的所有数据
    const accessmentsData = await Accessment.find();
    res.json({
      success: true,
      count: accessmentsData.length,
      data: accessmentsData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "数据查询失败：" + err.message,
    });
  }
});

// 定义服务器监听的端口
const port = 3001;
app.listen(port, () => {
  console.log(`🚀 后端服务已启动，运行在 http://localhost:${port}`);
  console.log(`📌 可访问接口：http://localhost:${port}/api/accessments`);
});
