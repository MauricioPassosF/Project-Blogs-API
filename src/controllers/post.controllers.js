const { postServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const insert = async (req, res) => {
  const { email, body } = req; 
  const { data, status } = await postServices.insert({ ...body, email });
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  insert,
};