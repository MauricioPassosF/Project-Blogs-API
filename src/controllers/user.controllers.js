const { userServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const insert = async (req, res) => {
  const { data, status } = await userServices.insert(req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

const getAll = async (req, res) => {
  const { data, status } = await userServices.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  insert,
  getAll,
};