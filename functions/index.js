const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

const { createUser, getUser } = require('./src/modules/users');

exports.createUser = createUser;
exports.getUser = getUser;

exports.setIncrementId = functions.firestore.document('users/{userId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();
    const usersRef = admin.firestore().collection('users');

    const querySnapshot = await usersRef.orderBy('increment_id', 'desc').limit(1).get();
    let lastIncrementId = 0;
    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0];
      lastIncrementId = lastDoc.data().increment_id;
    }

    const incrementId = lastIncrementId + 1;
    await snap.ref.update({ increment_id: incrementId });
  });
