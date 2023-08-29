const { postServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const insert = async (req, res) => {
  const { email, body } = req; 
  const { data, status } = await postServices.insert({ ...body, email });
  res.status(mapStatusHTTP(status)).json(data);
};

const getAll = async (_req, res) => {
  const { data, status } = await postServices.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

const getById = async (req, res) => {
  const { data, status } = await postServices.getById(Number(req.params.id));
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  insert,
  getAll,
  getById,
};