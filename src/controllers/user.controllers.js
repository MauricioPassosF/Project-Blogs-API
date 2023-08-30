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

const getById = async (req, res) => {
  const { data, status } = await userServices.getById(Number(req.params.id));
  res.status(mapStatusHTTP(status)).json(data);
};

const deleteUser = async (req, res) => {
  const { email } = req;
  const { data, status } = await userServices.deleteUser(email);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getById,
  insert,
  getAll,
  deleteUser,
};