const Branch = require("../models/branchModel");

// @desc    Get all branches
// @route   GET /api/v1/branches
// @access  Public
exports.getBranches = async (_req, res, _next) => {
  try {
    const branches = await Branch.find();

    return res.status(200).json({
      success: true,
      count: branches.length,
      data: branches,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add branch
// @route   POST /api/v1/branches
// @access  Public
exports.addBranch = async (req, res, _next) => {
  try {
    const branch = await Branch.create(req.body);
    return res.status(201).json({
      success: true,
      data: branch,
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

// @desc    Delete branch
// @route   DELETE /api/v1/branches/:id
// @access  Public
exports.deleteBranch = async (req, res, _next) => {
  try {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: "No branch found",
      });
    }

    await branch.remove();

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

// @desc    Update branch
// @route   PUT /api/v1/branches/:id
// @access  Public
exports.updateBranch = async (req, res, _next) => {
  try {
    await Branch.findByIdAndUpdate(req.params.id, req.body);
    const newBranch = await Branch.findById(req.params.id);

    return res.status(201).json({
      success: true,
      data: newBranch,
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

// @desc    Get branch
// @route   GET /api/v1/branches/:id
// @access  Public
exports.getBranch = async (req, res, _next) => {
  try {
    const branch = await Branch.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: branch,
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
