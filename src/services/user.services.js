const { User } = require('../models');
const { validateFormat } = require('../utils/servicesHelpers');
const tokenCreate = require('../utils/tokenCreate');

const insert = async (userInfo) => {
  const errorFormat = validateFormat(userInfo);
  if (errorFormat) {
    return { status: 'BAD_REQUEST', data: { message: errorFormat } };
  }
  try {
    await User.create(userInfo);
    const token = tokenCreate(userInfo.email);
    return { status: 'CREATED', data: { token } };
  } catch (error) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
};

const getAll = async () => {
  const allUsers = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return { status: 'SUCCESSFULL', data: allUsers };
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'displayName', 'email', 'image'],
    });
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
    }
    return { status: 'SUCCESSFULL', data: user };
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
};

const deleteUser = async (email) => {
  await User.destroy({ where: { email } });
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  getById,
  insert,
  getAll,
  deleteUser,
};
