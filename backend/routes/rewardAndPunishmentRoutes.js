const express = require("express");
const router = express.Router();
const RewardAndPunishment = require("../models/RewardAndPunishment");

// 获取所有rewardandpunishments数据
router.get("/rewardandpunishments", async (req, res) => {
  try {
    const data = await RewardAndPunishment.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
