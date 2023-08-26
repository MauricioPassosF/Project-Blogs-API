const route = require('express').Router();
const { loginControllers } = require('../controllers');
const { loginValidations } = require('../middlewares');

route.post(
  '/',
  loginValidations.validateFields,
  loginControllers.authenticate,
);

module.exports = route;
