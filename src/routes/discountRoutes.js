const express = require("express");
const router = express.Router();
const {
  getDiscounts,
  addDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscount,
} = require("../controllers/discountsController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("discounts", 600), getDiscounts)
  .post(deCache("discounts"), addDiscount);

router
  .route("/:id")
  .delete(deCache("discounts"), deleteDiscount)
  .put(deCache("discounts"), updateDiscount)
  .get(cache("discounts", 600), getDiscount);

module.exports = router;
