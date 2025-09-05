const mongoose = require("../config/db");

// AnalyzeStaff 集合模型
const AnalyzeStaffSchema = new mongoose.Schema({}, { 
  collection: "analyzeStaff", 
  strict: false 
});

module.exports = mongoose.model("AnalyzeStaff", AnalyzeStaffSchema);
