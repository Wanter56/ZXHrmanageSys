const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// 中间件
app.use(cors()); // 解决跨域问题
app.use(express.json()); // 解析JSON请求体

// 连接MongoDB数据库
mongoose
  .connect("mongodb://localhost:27017/staff", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB连接成功"))
  .catch((err) => console.error("MongoDB连接失败:", err));

// 创建数据模型
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// API接口
// 获取所有用户
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个用户
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "用户不存在" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加用户
app.post("/api/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 启动服务器
const port = 27017;
app.listen(port, () => {
  console.log(`后端服务运行在 http://localhost:${port}`);
});
