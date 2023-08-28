const jwt = require('jsonwebtoken');

const extractToken = (bearerToken) => bearerToken.split(' ')[1];

const validateToken = (bearerToken) => {
  const secret = process.env.JWT_SECRET;
  const token = extractToken(bearerToken);
  
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.data.email;
  } catch (error) {
    return false;
  }
};

module.exports = validateToken;