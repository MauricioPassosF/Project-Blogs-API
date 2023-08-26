const { User } = require('../models');
const tokenCreate = require('../utils/tokenCreate');

const validateLogin = async (email, password) => {
  const account = await User.findOne({ where: { email, password } });
  if (!account) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }
};

const authenticate = async ({ email, password }) => {
  const validateError = await validateLogin(email, password);
  if (validateError) {
    return validateError;
  }
  const token = tokenCreate(email);
  return { status: 'SUCCESSFULL', data: { token } };
};

module.exports = {
  authenticate,
};