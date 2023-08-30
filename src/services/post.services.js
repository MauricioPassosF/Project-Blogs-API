const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const { createUpdateObject } = require('../utils/servicesHelpers');
const { validateCategories, getUserId, getPostData,
  validateUser,
} = require('./validations/postValidations');

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
const getById = async (id) => {
  try {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!post) {
      return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
    }
    return { status: 'SUCCESSFULL', data: post };
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
};
const update = async ({ id, body, email }) => {
  const userValidate = await validateUser(email, id);
  if (!userValidate) { return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; }
  const updateValues = createUpdateObject(body);
  await BlogPost.update(updateValues, { where: { id } });
  return getById(id);
};
module.exports = { insert, getAll, getById, update };