const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userDef } = require("./schemaDef");
const userSchema = new mongoose.Schema(userDef, { timestamps: true });
// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
