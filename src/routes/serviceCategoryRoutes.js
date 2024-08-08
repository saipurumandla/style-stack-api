const express = require("express");
const router = express.Router();
const {
  getServiceCategories,
  addServiceCategory,
  deleteServiceCategory,
  updateServiceCategory,
  getServiceCategory,
} = require("../controllers/serviceCategoriesController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("serviceCategories", 600), getServiceCategories)
  .post(deCache("serviceCategories"), addServiceCategory);

router
  .route("/:id")
  .delete(deCache("serviceCategories"), deleteServiceCategory)
  .put(deCache("serviceCategories"), updateServiceCategory)
  .get(cache("serviceCategories", 600), getServiceCategory);

module.exports = router;
