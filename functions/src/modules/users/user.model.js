const admin = require('firebase-admin');
const { FieldValue } = require("firebase-admin/firestore");

const db = admin.firestore();

class User {
  constructor(data) {
    this.name = data.name || null;
    this.createdAt = FieldValue.serverTimestamp()
  }

  async save() {
    const res = await db.collection('users').add({
      name: this.name,
      createdAt: this.createdAt
    });
    this.id = res.id;
    return true;
  }

  static async findByIncrementId(incrementId) {
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('increment_id', '==', Number(incrementId)).get();

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { ...doc.data() };
  }

}

module.exports = User;
