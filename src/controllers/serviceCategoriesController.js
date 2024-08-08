const ServiceCategory = require("../models/serviceCategoryModel");

// @desc    Get all serviceCategories
// @route   GET /api/v1/service-categories
// @access  Public
exports.getServiceCategories = async (_req, res, _next) => {
  try {
    const serviceCategories = await ServiceCategory.find();

    return res.status(200).json({
      success: true,
      count: serviceCategories.length,
      data: serviceCategories,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add serviceCategory
// @route   POST /api/v1/service-categories
// @access  Public
exports.addServiceCategory = async (req, res, _next) => {
  try {
    const serviceCategory = await ServiceCategory.create(req.body);

    return res.status(201).json({
      success: true,
      data: serviceCategory,
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

// @desc    Delete serviceCategory
// @route   DELETE /api/v1/service-categories/:id
// @access  Public
exports.deleteServiceCategory = async (req, res, _next) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.id);

    if (!serviceCategory) {
      return res.status(404).json({
        success: false,
        error: "No serviceCategory found",
      });
    }

    await serviceCategory.remove();

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

// @desc    Update serviceCategory
// @route   PUT /api/v1/service-categories/:id
// @access  Public
exports.updateServiceCategory = async (req, res, _next) => {
  try {
    await ServiceCategory.findByIdAndUpdate(req.params.id, req.body);
    const newServiceCategory = await ServiceCategory.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newServiceCategory,
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

// @desc    Get serviceCategory
// @route   GET /api/v1/service-categories/:id
// @access  Public
exports.getServiceCategory = async (req, res, _next) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: serviceCategory,
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
