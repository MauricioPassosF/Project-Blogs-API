const Joi = require('joi');

const createUpdateObject = ({ title, content }) => {
  let object = { updated: new Date() };
  if (title) {
    object = { ...object, title };
  }
  if (content) {
    object = { ...object, content };
  }
  return object;
};

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
  validateFormat,
  createUpdateObject,
};