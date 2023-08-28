const { categoriesServices } = require('../services');
const { mapStatusHTTP } = require('../utils/statusByHTTP');

const insert = async (req, res) => {
  const { data, status } = await categoriesServices.insert(req.body.name);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  insert,
};