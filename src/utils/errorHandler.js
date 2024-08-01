const errorHandler = (err, _req, res, _) => {
  res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
