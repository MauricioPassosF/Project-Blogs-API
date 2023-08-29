const Joi = require('joi');
const { BlogPost, Category, User } = require('../models');

const validateCategories = async (categoryIds) => {
  try {
    const promises = await categoryIds.map((id) => Category.findByPk(id, { attributes: ['id'] }));
    const categories = await Promise.all(promises);
    return !categories.includes(null);
  } catch (error) {
    return false;
  }
};

const getUserId = async (email) => {
  const userId = await User.findOne({ where: { email }, attributes: ['id'] });
  return userId.dataValues.id;
};

const getPostData = async (id) => BlogPost.findByPk(id);

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

module.exports = {
  validateCategories,
  getUserId,
  getPostData,
  validateFormat,
};