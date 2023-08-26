const { loginServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const authenticate = async (req, res) => {
  const { data, status } = await loginServices.authenticate(req.body);
  console.log(data);
  res.status(mapStatusHTTP(status)).json(data);
 };

module.exports = {
  authenticate,
};