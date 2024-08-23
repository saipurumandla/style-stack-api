const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res, _next) => {
  try {
    const branchId = req.branchId;
    const products = await Product.find({ branchId });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add product
// @route   POST /api/v1/products
// @access  Public
exports.addProduct = async (req, res, _next) => {
  try {
    const new_product = req.body;
    new_product.branchId = req.branchId;
    const product = await Product.create(new_product);

    return res.status(201).json({
      success: true,
      data: product,
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

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Public
exports.deleteProduct = async (req, res, _next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product found",
      });
    }
    if (product.branchId !== req.branchId) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this product",
      });
    }
    await product.remove();

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

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Public
exports.updateProduct = async (req, res, _next) => {
  try {
    let update_product = req.body;
    update_product.branchId = req.branchId;
    await Product.updateOne(
      { _id: req.params.id, branchId: req.branchId },
      update_product,
    );
    const newProduct = await Product.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newProduct,
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

// @desc    Get product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res, _next) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: product,
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
