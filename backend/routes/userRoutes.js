const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 获取所有users数据
router.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
