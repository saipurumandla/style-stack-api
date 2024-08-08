const mongoose = require("mongoose");
const { serviceCategoryDef } = require("./schemaDef");
const serviceCategorySchema = new mongoose.Schema(serviceCategoryDef, {
  timestamps: true,
});

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
