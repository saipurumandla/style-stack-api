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
const authRoutes = require("./authRoutes");
const branchRoutes = require("./branchRoutes");
const employeeRoutes = require("./employeeRoutes");
const { checkBranchId } = require("../guards/branchGuard");
const { checkSuperAdminAccess } = require("../guards/superAdminGuard");

router.use("/bills", checkBranchId, billRoutes);
router.use("/branches", checkSuperAdminAccess, branchRoutes);
router.use("/customers", customerRoutes);
router.use("/discounts", checkBranchId, discountRoutes);
router.use("/auth", authRoutes);
router.use("/products", checkBranchId, productRoutes);
router.use("/product-categories", productCategoryRoutes);
router.use("/service-categories", serviceCategoryRoutes);
router.use("/services", checkBranchId, serviceRoutes);
router.use("/product-brands", productBrandRoutes);
router.use("/users", checkSuperAdminAccess, userRoutes);
router.use("/employees", checkBranchId, employeeRoutes);

// Export the router
module.exports = router;
