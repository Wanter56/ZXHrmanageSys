const mongoose = require("../config/db");

// User 集合模型
const UserSchema = new mongoose.Schema({}, { 
  collection: "users", 
  strict: false 
});

module.exports = mongoose.model("User", UserSchema);
