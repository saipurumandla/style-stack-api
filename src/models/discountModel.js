const mongoose = require("mongoose");
const { discountDef } = require("./schemaDef");
const discountSchema = new mongoose.Schema(discountDef, { timestamps: true });

module.exports = mongoose.model("Discount", discountSchema);
