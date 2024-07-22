const admin = require('firebase-admin');
const { Firestore } = require("firebase-admin/firestore");

const db = admin.firestore();

class User {
  constructor(data) {
    this.name = data.name || null;
    this.createdAt = Firestore.FieldValue.serverTimestamp()
  }

  async save() {
    const docRef = await db.collection('users').add({
      name: this.name,
      createdAt: this.createdAt
    });
    this.id = docRef.id;
    return this;
  }

  static async findById(id) {
    const docRef = db.collection('users').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  }
}

module.exports = User;
