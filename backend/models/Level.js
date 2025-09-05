const mongoose = require("../config/db");

// Level 集合模型
const LevelSchema = new mongoose.Schema({}, { 
  collection: "levels", 
  strict: false 
});

module.exports = mongoose.model("Level", LevelSchema);
