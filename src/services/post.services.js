const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');

const validateCategories = async (categoryIds) => {
  try {
    const promises = await categoryIds.map((id) =>
      Category.findByPk(id, {
        attributes: ['id'],
      }));
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

const getPostData = async (id) => (BlogPost.findByPk(id));

const insert = async ({ title, content, email, categoryIds }) => {
  const validate = await validateCategories(categoryIds);
  if (!validate) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  const userId = await getUserId(email);
  const t = await sequelize.transaction();
  try {
    const { dataValues: { id } } = await BlogPost
    .create({ title, content, userId }, { transaction: t });
    const postsCategories = categoryIds.map((categoryId) => ({ categoryId, postId: id }));
    await PostCategory.bulkCreate(postsCategories, { transaction: t });
    await t.commit();
    const data = await getPostData(id);
    return { status: 'CREATED', data };
  } catch (error) {
    await t.rollback();
  }
};

module.exports = {
  insert,
};