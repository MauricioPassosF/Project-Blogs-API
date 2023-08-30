const loginServices = require('./login.services');
const userServices = require('./user.services');
const categoriesServices = require('./categories.services');
const postServices = require('./post.services');
const postByIdServices = require('./postById.services');

module.exports = {
  loginServices,
  userServices,
  categoriesServices,
  postServices,
  postByIdServices,
};