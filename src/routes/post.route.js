const route = require('express').Router();
const { postControllers } = require('../controllers');
const { tokenValidations, postValidations } = require('../middlewares');

route.post(
  '/',
  postValidations.validateFieldsNew,
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.insert,
);

route.get(
  '/',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.getAll,
);

route.get(
  '/:id',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.getById,
);

module.exports = route;