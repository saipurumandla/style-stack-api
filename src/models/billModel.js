const mongoose = require("mongoose");
const { billDef } = require("./schemaDef");
const billSchema = new mongoose.Schema(billDef, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
