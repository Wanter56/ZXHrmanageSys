const express = require("express");
const router = express.Router();
const Level = require("../models/Level");

// 获取所有levels数据
router.get("/levels", async (req, res) => {
  try {
    const data = await Level.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
