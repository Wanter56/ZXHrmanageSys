const express = require("express");
const router = express.Router();
const Accessment = require("../models/Accessment");

// 获取所有accessments数据
router.get("/accessments", async (req, res) => {
  try {
    const data = await Accessment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
