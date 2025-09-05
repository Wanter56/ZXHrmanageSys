const mongoose = require("../config/db");

// RewardAndPunishment 集合模型
const RewardAndPunishmentSchema = new mongoose.Schema({}, { 
  collection: "rewardandpunishments", 
  strict: false 
});

module.exports = mongoose.model("RewardAndPunishment", RewardAndPunishmentSchema);
