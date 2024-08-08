const mongoose = require("mongoose");
const { productCategoryDef } = require("./schemaDef");
const productCategorySchema = new mongoose.Schema(productCategoryDef, {
  timestamps: true,
});

module.exports = mongoose.model("ProductCategory", productCategorySchema);
