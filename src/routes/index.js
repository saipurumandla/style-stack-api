const express = require("express");
const router = express.Router();

const billRoutes = require("./billRoutes");
const customerRoutes = require("./customerRoutes");
const discountRoutes = require("./discountRoutes");
const productBrandRoutes = require("./productBrandRoutes");
const productCategoryRoutes = require("./productCategoryRoutes");
const productRoutes = require("./productRoutes");
const serviceCategoryRoutes = require("./serviceCategoryRoutes");
const serviceRoutes = require("./serviceRoutes");
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/bills", billRoutes);
router.use("/customers", customerRoutes);
router.use("/discounts", discountRoutes);
router.use("/login", loginRoutes);
router.use("/products", productRoutes);
router.use("/product-categories", productCategoryRoutes);
router.use("/service-categories", serviceCategoryRoutes);
router.use("/services", serviceRoutes);
router.use("/product-brands", productBrandRoutes);
router.use("/users", userRoutes);

// Export the router
module.exports = router;
