const { Category } = require('../models');

const insert = async (categoryName) => {
    const modelResponse = await Category.create({ name: categoryName });
    return { status: 'CREATED', data: modelResponse };
};

const getAll = async () => {
  const allCategories = await Category.findAll({
    order: [['id', 'ASC']],
  });
  return { status: 'SUCCESSFULL', data: allCategories };
};

module.exports = {
  insert,
  getAll,
};