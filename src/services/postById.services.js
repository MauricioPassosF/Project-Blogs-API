const { BlogPost, Category, User } = require('../models');
const { createUpdateObject } = require('../utils/servicesHelpers');
const { validateUser } = require('./validations/postValidations');

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
  if (userValidate) { return userValidate; }
  const updateValues = createUpdateObject(body);
  await BlogPost.update(updateValues, { where: { id } });
  return getById(id);
};

const deletePost = async (email, id) => {
  const userValidate = await validateUser(email, id);
  if (userValidate) { return userValidate; }
  await BlogPost.destroy({ where: { id } });
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = { getById, update, deletePost };
