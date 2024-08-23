const mongoose = require("mongoose");
const { branchDef } = require("./schemaDef");
const branchSchema = new mongoose.Schema(branchDef, { timestamps: true });

module.exports = mongoose.model("Branch", branchSchema);
