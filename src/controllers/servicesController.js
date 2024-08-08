const Service = require("../models/serviceModel");

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = async (_req, res, _next) => {
  try {
    const services = await Service.find();

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add service
// @route   POST /api/v1/services
// @access  Public
exports.addService = async (req, res, _next) => {
  try {
    const service = await Service.create(req.body);

    return res.status(201).json({
      success: true,
      data: service,
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

// @desc    Delete service
// @route   DELETE /api/v1/services/:id
// @access  Public
exports.deleteService = async (req, res, _next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "No service found",
      });
    }

    await service.remove();

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

// @desc    Delete service
// @route   PUT /api/v1/services/:id
// @access  Public
exports.updateService = async (req, res, _next) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body);
    const newService = await Service.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newService,
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

// @desc    Get service
// @route   GET /api/v1/services/:id
// @access  Public
exports.getService = async (req, res, _next) => {
  try {
    const service = await Service.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: service,
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
