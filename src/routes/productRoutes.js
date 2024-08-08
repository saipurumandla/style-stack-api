const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} = require("../controllers/productsController");
const { cache, deCache } = require("../helpers/cache");

router
  .route("/")
  .get(cache("products", 600), getProducts)
  .post(deCache("products"), addProduct);

router
  .route("/:id")
  .delete(deCache("products"), deleteProduct)
  .put(deCache("products"), updateProduct)
  .get(cache("products", 600), getProduct);

module.exports = router;
