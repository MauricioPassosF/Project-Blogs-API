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

route.put(
  '/:id',
  postValidations.validateFieldsUpdate,
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.update,
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

route.delete(
  '/:id',
  tokenValidations.validateFields,
  tokenValidations.validateBearerToken,
  postControllers.deletePost,
);

module.exports = route;