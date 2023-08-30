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
  const postById = await BlogPost.findByPk(id);
  if (!postById) { return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } }; }
  return postById.dataValues.userId === userIdToken
    ? false
    : { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
};

module.exports = {
  validateCategories,
  getUserId,
  getPostData,
  validateUser,
};
