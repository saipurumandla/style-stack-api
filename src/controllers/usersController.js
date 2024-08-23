const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../helpers/jwt");

exports.getUsers = async (_req, res) => {
  try {
    let users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.addUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    status: req.body.status,
    branchId: req.body.branchId,
  });

  try {
    const newUser = (await user.save()).toObject();
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      success: true,
      data: userWithoutPassword,
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
        error: err.message,
      });
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res, _next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    const user = await User.findById(req.params.id).select("-password");
    return res.status(201).json({
      success: true,
      data: user,
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
exports.deleteUser = async (req, res, _next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
    user.status = false;
    await user.save();
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
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // eslint-disable-next-line no-unused-vars
    const { password: _password, ...userWithoutPassword } = user.toObject();
    // Generate token or respond with success
    res.status(200).json({ userWithoutPassword, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  // Check if refresh token is provided
  if (!token) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const user = verifyToken(token, process.env.JWT_REFRESH_SECRET);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);

    // Respond with the new access token
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    // Handle errors, such as token expiry or invalid token
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
