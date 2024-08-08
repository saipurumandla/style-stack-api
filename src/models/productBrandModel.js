const mongoose = require("mongoose");
const { productBrandDef } = require("./schemaDef");
const productBrandSchema = new mongoose.Schema(productBrandDef, {
  timestamps: true,
});

module.exports = mongoose.model("ProductBrand", productBrandSchema);
