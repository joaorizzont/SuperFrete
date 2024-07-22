const admin = require('firebase-admin');
admin.initializeApp();

const { createUser, getUser } = require('./src/modules/users');

exports.createUser = createUser;
exports.getUser = getUser;