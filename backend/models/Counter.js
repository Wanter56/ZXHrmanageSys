// ../models/Counter.js
const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema({
  collectionName: { type: String, required: true, unique: true }, // 唯一，避免重复
  currentMaxId: { type: Number, required: true, default: 0 } // 必须是 Number 类型
});
module.exports = mongoose.model("Counter", counterSchema);