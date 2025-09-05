const mongoose = require("../config/db");

// SalaryAdjustment 集合模型
const SalaryAdjustmentSchema = new mongoose.Schema({}, { 
  collection: "salaryadjustments", 
  strict: false 
});

module.exports = mongoose.model("SalaryAdjustment", SalaryAdjustmentSchema);
