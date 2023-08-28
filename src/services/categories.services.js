const { Category } = require('../models');

const insert = async (categoryName) => {
    const modelResponse = await Category.create({ name: categoryName });
    return { status: 'CREATED', data: modelResponse };
};

module.exports = {
  insert,
};