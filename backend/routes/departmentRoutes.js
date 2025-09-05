const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// 获取所有departments数据
router.get("/departments", async (req, res) => {
  try {
    const data = await Department.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
