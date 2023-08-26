const route = require('express').Router();

route.post(
'/',
//  loginControllers.authenticate,
 (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: password && email });
 },
);

module.exports = route;