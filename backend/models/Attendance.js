const mongoose = require("../config/db");

// Attendance 集合模型
const AttendanceSchema = new mongoose.Schema({}, { 
  collection: "attendances", 
  strict: false 
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
