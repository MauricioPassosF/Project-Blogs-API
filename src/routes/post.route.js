const route = require('express').Router();
const { postControllers } = require('../controllers');
const { tokenValidations, postValidations } = require('../middlewares');

route.post(
  '/',
  postValidations.validateFields,
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.insert,
);

module.exports = route;