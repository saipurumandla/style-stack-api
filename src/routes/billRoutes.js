const express = require("express");
const router = express.Router();
const {
  getBills,
  addBill,
  deleteBill,
  updateBill,
  getBill,
} = require("../controllers/billsController");

router.route("/").get(getBills).post(addBill);

router.route("/:id").delete(deleteBill).put(updateBill).get(getBill);

module.exports = router;
