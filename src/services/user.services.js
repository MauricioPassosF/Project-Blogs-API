const Joi = require('joi');
const { User } = require('../models');
const tokenCreate = require('../utils/tokenCreate');

const validateEmail = (email) => {
  const emailSchema = Joi.string().email();
  const { error } = emailSchema.validate(email);
  if (error) {
    return '"email" must be a valid email';
  }
};

const validateName = (displayName) => {
  if (displayName.length <= 7) {
    return '"displayName" length must be at least 8 characters long';
  }
};

const validatePassword = (password) => {
  if (password.length <= 5) {
    return '"password" length must be at least 6 characters long';
  }
};

const validateFormat = ({ displayName, email, password }) => {
  const errorName = validateName(displayName);
  if (errorName) {
    return errorName;
  }
  const errorEmail = validateEmail(email);
  if (errorEmail) {
    return errorEmail;
  }
  const errorPassword = validatePassword(password);
  if (errorPassword) {
    return errorPassword;
  }
};

const insert = async (userInfo) => {
  const errorFormat = validateFormat(userInfo);
  if (errorFormat) {
    return { status: 'BAD_REQUEST', data: { message: errorFormat } };
  }
  try {
    await User.create(userInfo);
    const token = tokenCreate(userInfo.email);
    return { status: 'CREATED', data: { token } };
  } catch (error) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
};

const getAll = async () => {
  const allUsers = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return { status: 'SUCCESSFULL', data: allUsers };
};

module.exports = {
  insert,
  getAll,
};
