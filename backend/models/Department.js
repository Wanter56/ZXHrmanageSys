const mongoose = require("../config/db");

// Department 集合模型（保留原拼写deparments）
const DepartmentSchema = new mongoose.Schema({}, { 
  collection: "deparments", 
  strict: false 
});

module.exports = mongoose.model("Department", DepartmentSchema);
