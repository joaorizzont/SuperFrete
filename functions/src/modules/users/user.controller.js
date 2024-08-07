const userService = require('./user.service');

exports.createUser = async (data) => {
  try {
    const userCreated = await userService.createUser(data);
    return userCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await userService.getUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};