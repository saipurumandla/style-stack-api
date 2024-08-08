const express = require("express");
const router = express.Router();
const {
  getProductBrands,
  addProductBrand,
  deleteProductBrand,
  updateProductBrand,
  getProductBrand,
} = require("../controllers/productBrandsController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("productBrands", 600), getProductBrands)
  .post(deCache("productBrands"), addProductBrand);

router
  .route("/:id")
  .delete(deCache("productBrands"), deleteProductBrand)
  .put(deCache("productBrands"), updateProductBrand)
  .get(cache("productBrands", 600), getProductBrand);

module.exports = router;
