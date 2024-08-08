const mongoose = require("mongoose");
const { customerDef } = require("./schemaDef");
const customerSchema = new mongoose.Schema(customerDef, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
