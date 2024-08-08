const mongoose = require("mongoose");
const { serviceDef } = require("./schemaDef");
const serviceSchema = new mongoose.Schema(serviceDef, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
