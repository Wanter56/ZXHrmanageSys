const mongoose = require("../config/db");

// Router 集合模型
const RouterSchema = new mongoose.Schema({}, { 
  collection: "routers", 
  strict: false 
});

module.exports = mongoose.model("Router", RouterSchema);
