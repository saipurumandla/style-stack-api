const ProductBrand = require("../models/productBrandModel");

// @desc    Get all productBrands
// @route   GET /api/v1/product-brands
// @access  Public
exports.getProductBrands = async (_req, res, _next) => {
  try {
    const productBrands = await ProductBrand.find();

    return res.status(200).json({
      success: true,
      count: productBrands.length,
      data: productBrands,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add productBrand
// @route   POST /api/v1/product-brands
// @access  Public
exports.addProductBrand = async (req, res, _next) => {
  try {
    const productBrand = await ProductBrand.create(req.body);

    return res.status(201).json({
      success: true,
      data: productBrand,
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

// @desc    Delete productBrand
// @route   DELETE /api/v1/product-brands/:id
// @access  Public
exports.deleteProductBrand = async (req, res, _next) => {
  try {
    const productBrand = await ProductBrand.findById(req.params.id);

    if (!productBrand) {
      return res.status(404).json({
        success: false,
        error: "No productBrand found",
      });
    }

    await productBrand.remove();

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

// @desc    Delete productBrand
// @route   PUT /api/v1/product-brands/:id
// @access  Public
exports.updateProductBrand = async (req, res, _next) => {
  try {
    await ProductBrand.findByIdAndUpdate(req.params.id, req.body);
    const newProductBrand = await ProductBrand.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newProductBrand,
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

// @desc    Get productBrand
// @route   GET /api/v1/product-brands/:id
// @access  Public
exports.getProductBrand = async (req, res, _next) => {
  try {
    const productBrand = await ProductBrand.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: productBrand,
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
