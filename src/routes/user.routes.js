const route = require('express').Router();
const { userControllers } = require('../controllers');

route.post(
  '/',
  userControllers.insert,
);

module.exports = route;