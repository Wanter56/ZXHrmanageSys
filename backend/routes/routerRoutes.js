const express = require("express");
const router = express.Router();
const Router = require("../models/Router");

// 获取所有routers数据
router.get("/routers", async (req, res) => {
  try {
    const data = await Router.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "查询失败：" + err.message });
  }
});

module.exports = router;
