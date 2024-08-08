const express = require("express");
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomer,
} = require("../controllers/customersController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("customers", 600), getCustomers)
  .post(deCache("customers"), addCustomer);

router
  .route("/:id")
  .delete(deCache("customers"), deleteCustomer)
  .put(deCache("customers"), updateCustomer)
  .get(cache("customers", 600), getCustomer);

module.exports = router;
