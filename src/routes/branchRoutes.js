const express = require("express");
const router = express.Router();
const {
  getBranches,
  addBranch,
  deleteBranch,
  updateBranch,
  getBranch,
} = require("../controllers/branchesController");

router.route("/").get(getBranches).post(addBranch);

router.route("/:id").delete(deleteBranch).put(updateBranch).get(getBranch);

module.exports = router;
