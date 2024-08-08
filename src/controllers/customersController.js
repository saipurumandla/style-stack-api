const Customer = require("../models/customerModel");

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Public
exports.getCustomers = async (_req, res, _next) => {
  try {
    const customers = await Customer.find();

    return res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add customer
// @route   POST /api/v1/customers
// @access  Public
exports.addCustomer = async (req, res, _next) => {
  try {
    const customer = await Customer.create(req.body);

    return res.status(201).json({
      success: true,
      data: customer,
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

// @desc    Delete customer
// @route   DELETE /api/v1/customers/:id
// @access  Public
exports.deleteCustomer = async (req, res, _next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "No customer found",
      });
    }

    await customer.remove();

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

// @desc    Delete customer
// @route   PUT /api/v1/customers/:id
// @access  Public
exports.updateCustomer = async (req, res, _next) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, req.body);
    const newCustomer = await Customer.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newCustomer,
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

// @desc    Get customer
// @route   GET /api/v1/customers/:id
// @access  Public
exports.getCustomer = async (req, res, _next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: customer,
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
