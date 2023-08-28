const { loginServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const authenticate = async (req, res) => {
  const { data, status } = await loginServices.authenticate(req.body);
  res.status(mapStatusHTTP(status)).json(data);
 };

module.exports = {
  authenticate,
};