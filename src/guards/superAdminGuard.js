exports.checkSuperAdminAccess = (req, res, next) => {
  const { user } = req;
  if (user.role !== "super-admin") {
    return res.status(400).json({ message: "Super Admin access required" });
  }

  next();
};
