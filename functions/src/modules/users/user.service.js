const User = require('./user.model');

exports.createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
