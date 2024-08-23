const { verifyToken } = require("../helpers/jwt");

const authenticateToken = (req, res, next) => {
  if (req.path.startsWith("/api/v1/auth")) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const user = verifyToken(token, process.env.JWT_SECRET);
  if (!user) {
    return res.sendStatus(403);
  }
  const branchId = req.headers["branch-id"];
  if (!branchId && user.role !== "super-admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: branch id is required" });
  }
  if (branchId) {
    if (user.role !== "super-admin") {
      if (user.branchId !== branchId) {
        return res.status(403).json({ message: "Forbidden: branch mismatch" });
      }
    }
  }

  req.user = user;
  req.branchId = branchId;
  next();
};

module.exports = { authenticateToken };
