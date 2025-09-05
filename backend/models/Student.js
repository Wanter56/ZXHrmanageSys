// ../models/Student.js（完全重建，删除原有内容）
const mongoose = require("mongoose");

// 1. 定义单个学生的子 Schema（可选，但让结构更清晰）
const singleStudentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // 确保ID唯一
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  education: { type: String, required: true },
  graduationschool: { type: String, required: true },
  profession: { type: String, required: true },
  profile: { type: String, default: "" },
  createTime: { type: String, required: true },
  updateTime: { type: String, required: true }
});

// 2. 定义学生集合的主 Schema（单文档存储所有学生）
const studentSchema = new mongoose.Schema({
  students: {
    type: [singleStudentSchema], // 数组类型，元素是单个学生
    default: []
  }
});

// 3. 关键：导出 Mongoose Model（必须用 mongoose.model() 包装）
module.exports = mongoose.model("Student", studentSchema);