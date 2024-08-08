const Bill = require("../models/billModel");

// @desc    Get all bills
// @route   GET /api/v1/bills
// @access  Public
exports.getBills = async (_req, res, _next) => {
  try {
    const bills = await Bill.find();

    return res.status(200).json({
      success: true,
      count: bills.length,
      data: bills,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add bill
// @route   POST /api/v1/bills
// @access  Public
exports.addBill = async (req, res, _next) => {
  try {
    const bill = await Bill.create(req.body);

    return res.status(201).json({
      success: true,
      data: bill,
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

// @desc    Delete bill
// @route   DELETE /api/v1/bills/:id
// @access  Public
exports.deleteBill = async (req, res, _next) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        error: "No bill found",
      });
    }

    await bill.remove();

    return res.status(202).json({
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

// @desc    Delete bill
// @route   PUT /api/v1/bills/:id
// @access  Public
exports.updateBill = async (req, res, _next) => {
  try {
    await Bill.findByIdAndUpdate(req.params.id, req.body);
    const newBill = await Bill.findById(req.params.id);

    return res.status(201).json({
      success: true,
      data: newBill,
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

// @desc    Get bill
// @route   GET /api/v1/bills/:id
// @access  Public
exports.getBill = async (req, res, _next) => {
  try {
    const bill = await Bill.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: bill,
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
