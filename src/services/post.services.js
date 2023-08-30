const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const { validateCategories, getUserId, getPostData } = require('./validations/postValidations');

const insert = async ({ title, content, email, categoryIds }) => {
  const validate = await validateCategories(categoryIds);
  if (!validate) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  const userId = await getUserId(email);
  const t = await sequelize.transaction();
  try {
    const {
      dataValues: { id },
    } = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postsCategories = categoryIds.map((categoryId) => ({ categoryId, postId: id }));
    await PostCategory.bulkCreate(postsCategories, { transaction: t });
    await t.commit();
    const data = await getPostData(id);
    return { status: 'CREATED', data };
  } catch (error) {
    await t.rollback();
  }
};

const getAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFULL', data };
};

const getBySearch = async (searchTerm) => {
  const data = await BlogPost.findAll({
    where: {
      [Op.or]: [[{ title: {
        [Op.like]: `%${searchTerm}%`,
      } }],
      [{ content: {
        [Op.like]: `%${searchTerm}%`,
      } }],
    ],
    },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFULL', data };
};

module.exports = { insert, getAll, getBySearch };
