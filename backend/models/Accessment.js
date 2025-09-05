const mongoose = require("../config/db");

// Accessment 集合模型
const AccessmentSchema = new mongoose.Schema({}, { 
  collection: "accessments", 
  strict: false 
});

module.exports = mongoose.model("Accessment", AccessmentSchema);
