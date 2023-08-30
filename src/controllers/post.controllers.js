const { postServices, postByIdServices } = require('../services');
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
  const { data, status } = await postByIdServices.getById(Number(req.params.id));
  res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { email, body, params: { id } } = req; 
  const numId = Number(id);
  const { data, status } = await postByIdServices.update({ body, email, id: numId });
  res.status(mapStatusHTTP(status)).json(data);
};

const deletePost = async (req, res) => {
  const { email, params: { id } } = req; 
  const numId = Number(id);
  const { data, status } = await postByIdServices.deletePost(email, numId);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  insert,
  getAll,
  getById,
  update,
  deletePost,
};