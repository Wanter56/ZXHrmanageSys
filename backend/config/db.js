const mongoose = require("mongoose");

// 连接 MongoDB（单独抽离，便于后续修改配置）
mongoose
  .connect("mongodb://localhost:27017/staff")
  .then(() => {
    console.log("✅ 成功连接到 MongoDB 的 staff 数据库");
  })
  .catch((err) => {
    console.error("❌ MongoDB 数据库连接失败：", err);
  });

module.exports = mongoose; // 导出 mongoose，供模型文件使用