const validateToken = require('../utils/validateJWT');

const validateFields = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).json({ message: 'Token not found' });
  }
  next();
};

const validateBearerToken = (req, res, next) => {
    const responseJWT = validateToken(req.header('Authorization'));
    if (!responseJWT) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    req.email = responseJWT;
    next();
};

module.exports = {
  validateFields,
  validateBearerToken,
};