const AppError = require('../utils/AppError');

// Accepts roles as arguments, e.g., authorize('ADMIN'), authorize('USER', 'STORE_OWNER')
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action', 403);
    }
    next();
  };
};

module.exports = authorize;