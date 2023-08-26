const jwt = require('jsonwebtoken');

const tokenCreate = (email) => {
  const secret = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  return jwt.sign({ data: { email } }, secret, jwtConfig);
};

module.exports = tokenCreate;