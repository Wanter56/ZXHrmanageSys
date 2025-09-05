const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// 获取所有attendances数据
router.get("/attendances", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
