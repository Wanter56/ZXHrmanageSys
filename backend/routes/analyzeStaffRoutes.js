const express = require("express");
const router = express.Router();
const AnalyzeStaff = require("../models/AnalyzeStaff");

// 获取analyzeStaff数据
router.get("/analyzeStaff", async (req, res) => {
  try {
    const data = await AnalyzeStaff.findOne();
    const count = data ? 1 : 0; // 修复原错误：findOne返回单个文档，无length属性
    res.json({ success: true, count, data: data || null });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
