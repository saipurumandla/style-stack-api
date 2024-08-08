const express = require("express");
const router = express.Router();
const {
  getProductCategories,
  addProductCategory,
  deleteProductCategory,
  updateProductCategory,
  getProductCategory,
} = require("../controllers/productCategoriesController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("productCategories", 600), getProductCategories)
  .post(deCache("productCategories"), addProductCategory);

router
  .route("/:id")
  .delete(deCache("productCategories"), deleteProductCategory)
  .put(deCache("productCategories"), updateProductCategory)
  .get(cache("productCategories", 600), getProductCategory);

module.exports = router;
