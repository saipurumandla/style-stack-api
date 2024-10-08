const Employee = require("../models/employeeModel");

// @desc    Get all employees
// @route   GET /api/v1/employees
// @access  Public
exports.getEmployees = async (req, res, _next) => {
  try {
    const branchId = req.branchId;
    const employees = await Employee.find({ branchId });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add employee
// @route   POST /api/v1/employees
// @access  Public
exports.addEmployee = async (req, res, _next) => {
  try {
    let new_employee = req.body;
    new_employee.branchId = req.branchId;
    const employee = await Employee.create(new_employee);

    return res.status(201).json({
      success: true,
      data: employee,
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

// @desc    Delete employee
// @route   DELETE /api/v1/employees/:id
// @access  Public
exports.deleteEmployee = async (req, res, _next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "No employee found",
      });
    }
    if (employee.branchId !== req.branchId) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: branch mismatch",
      });
    }
    await employee.remove();

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

// @desc    Update employee
// @route   PUT /api/v1/employees/:id
// @access  Public
exports.updateEmployee = async (req, res, _next) => {
  try {
    let update_employee = req.body;
    update_employee.branchId = req.branchId;
    await Employee.updateOne(
      { _id: req.params.id, branchId: req.branchId },
      update_employee,
    );
    const newEmployee = await Employee.findById(req.params.id);
    return res.status(201).json({
      success: true,
      data: newEmployee,
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

// @desc    Get employee
// @route   GET /api/v1/employees/:id
// @access  Public
exports.getEmployee = async (req, res, _next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: employee,
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
