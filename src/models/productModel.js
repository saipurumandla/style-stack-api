const mongoose = require("mongoose");
const { productDef } = require("./schemaDef");
const productSchema = new mongoose.Schema(productDef, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
