const Bill = require("../models/billModel");

// @desc    Get all bills
// @route   GET /api/v1/bills
// @access  Public
exports.getBills = async (req, res, _next) => {
  try {
    const branchId = req.branchId;
    const bills = await Bill.find({ branchId });

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
    let new_bill = req.body;
    new_bill.branchId = req.branchId;
    const bill = await Bill.create(new_bill);

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
    if (bill.branchId !== req.branchId) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: bill mismatch",
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

// @desc    Update bill
// @route   PUT /api/v1/bills/:id
// @access  Public
exports.updateBill = async (req, res, _next) => {
  try {
    let update_bill = req.body;
    update_bill.branchId = req.branchId;
    await Bill.updateOne(
      { _id: req.params.id, branchId: req.branchId },
      update_bill,
    );
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
    if (!bill) {
      return res.status(404).json({
        success: false,
        error: "Bill not found",
      });
    }
    if (bill.branchId !== req.branchId) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: branch mismatch",
      });
    }
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
