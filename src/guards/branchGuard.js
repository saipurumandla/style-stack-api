exports.checkBranchId = (req, res, next) => {
  const { branchId } = req;

  if (!branchId) {
    return res.status(400).json({ message: "branch-id header is required" });
  }

  next();
};
