const express = require("express");
const router = express.Router();
const SalaryAdjustment = require("../models/SalaryAdjustment");

// 获取所有salaryadjustments数据
router.get("/salaryadjustments", async (req, res) => {
  try {
    const data = await SalaryAdjustment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
