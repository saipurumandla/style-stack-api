const Discount = require("../models/discountModel");

// @desc    Get all discounts
// @route   GET /api/v1/discounts
// @access  Public
exports.getDiscounts = async (_req, res, _next) => {
  try {
    const discounts = await Discount.find();

    return res.status(200).json({
      success: true,
      count: discounts.length,
      data: discounts,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add discount
// @route   POST /api/v1/discounts
// @access  Public
exports.addDiscount = async (req, res, _next) => {
  try {
    const discount = await Discount.create(req.body);

    return res.status(201).json({
      success: true,
      data: discount,
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

// @desc    Delete discount
// @route   DELETE /api/v1/discounts/:id
// @access  Public
exports.deleteDiscount = async (req, res, _next) => {
  try {
    const discount = await Discount.findById(req.params.id);

    if (!discount) {
      return res.status(404).json({
        success: false,
        error: "No discount found",
      });
    }

    await discount.remove();

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

// @desc    Update discount
// @route   PUT /api/v1/discounts/:id
// @access  Public
exports.updateDiscount = async (req, res, _next) => {
  try {
    await Discount.findByIdAndUpdate(req.params.id, req.body);
    const newDiscount = await Discount.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newDiscount,
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

// @desc    Get discount
// @route   GET /api/v1/discounts/:id
// @access  Public
exports.getDiscount = async (req, res, _next) => {
  try {
    const discount = await Discount.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: discount,
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
