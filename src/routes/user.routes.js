const route = require('express').Router();
const { userControllers } = require('../controllers');
const { tokenValidations } = require('../middlewares');

route.post('/', userControllers.insert);

route.get(
  '/',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  userControllers.getAll,
);

route.get(
  '/:id',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  userControllers.getById,
);

module.exports = route;
