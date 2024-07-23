const User = require('./user.model');

exports.createUser = async (data) => {
  const user = new User(data);
  const userCreated = await user.save();
  return userCreated;
};

exports.getUser = async (id) => {
  const user = await User.findByIncrementId(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
