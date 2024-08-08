const ProductCategory = require("../models/productCategoryModel");

// @desc    Get all productCategories
// @route   GET /api/v1/product-categories
// @access  Public
exports.getProductCategories = async (_req, res, _next) => {
  try {
    const productCategories = await ProductCategory.find();

    return res.status(200).json({
      success: true,
      count: productCategories.length,
      data: productCategories,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add productCategory
// @route   POST /api/v1/product-categories
// @access  Public
exports.addProductCategory = async (req, res, _next) => {
  try {
    const productCategory = await ProductCategory.create(req.body);

    return res.status(201).json({
      success: true,
      data: productCategory,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete productCategory
// @route   DELETE /api/v1/product-categories/:id
// @access  Public
exports.deleteProductCategory = async (req, res, _next) => {
  try {
    const productCategory = await ProductCategory.findById(req.params.id);

    if (!productCategory) {
      return res.status(404).json({
        success: false,
        error: "No productCategory found",
      });
    }

    await productCategory.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Delete productCategory
// @route   PUT /api/v1/product-categories/:id
// @access  Public
exports.updateProductCategory = async (req, res, _next) => {
  try {
    await ProductCategory.findByIdAndUpdate(req.params.id, req.body);
    const newProductCategory = await ProductCategory.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newProductCategory,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Get productCategory
// @route   GET /api/v1/product-categories/:id
// @access  Public
exports.getProductCategory = async (req, res, _next) => {
  try {
    const productCategory = await ProductCategory.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: productCategory,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
