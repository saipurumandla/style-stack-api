const mongoose = require("mongoose");
const { employeeDef } = require("./schemaDef");
const employeeSchema = new mongoose.Schema(employeeDef, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
