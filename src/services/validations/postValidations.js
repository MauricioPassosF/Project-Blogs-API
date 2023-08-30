const { BlogPost, Category, User } = require('../../models');

const validateCategories = async (categoryIds) => {
  try {
    const promises = await categoryIds.map((id) => Category.findByPk(id, { attributes: ['id'] }));
    const categories = await Promise.all(promises);
    return !categories.includes(null);
  } catch (error) {
    return false;
  }
};

const getUserId = async (email) => {
  const userId = await User.findOne({ where: { email }, attributes: ['id'] });
  return userId.dataValues.id;
};

const getPostData = async (id) => BlogPost.findByPk(id);

const validateUser = async (email, id) => {
  const userIdToken = await getUserId(email);
  const { dataValues: { userId } } = await BlogPost.findByPk(id);
  return userId === userIdToken;
};

module.exports = {
  validateCategories,
  getUserId,
  getPostData,
  validateUser,
};
