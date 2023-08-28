const route = require('express').Router();
const { categoriesControllers } = require('../controllers');
const { tokenValidations, categoriesValidations } = require('../middlewares');

route.post(
  '/',
  categoriesValidations.validateFields,
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  categoriesControllers.insert,
);

route.get(
  '/',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  categoriesControllers.getAll,
);

module.exports = route;
