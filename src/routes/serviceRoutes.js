const express = require("express");
const router = express.Router();
const {
  getServices,
  addService,
  deleteService,
  updateService,
  getService,
} = require("../controllers/servicesController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("services", 600), getServices)
  .post(deCache("services"), addService);

router
  .route("/:id")
  .delete(deCache("services"), deleteService)
  .put(deCache("services"), updateService)
  .get(cache("services", 600), getService);

module.exports = router;
