const authMiddleware = (_req, _res, next) => {
  // Add your authentication logic here
  next();
};

module.exports = authMiddleware;
