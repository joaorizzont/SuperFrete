const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Função HTTP para criar um novo registro
exports.createRecord = functions.https.onRequest(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    // Adiciona um novo documento à coleção 'records'
    const docRef = await db.collection('records').add({
      name: name
    });

    res.status(201).send(`Record created with ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Trigger Firestore onCreate para definir o increment_id
exports.setIncrementId = functions.firestore.document('records/{recordId}')
  .onCreate(async (snap, context) => {
    const incrementIdRef = db.collection('metadata').doc('increment_id');

    await db.runTransaction(async (t) => {
      const doc = await t.get(incrementIdRef);

      let incrementId = 1;
      if (doc.exists) {
        incrementId = doc.data().lastIncrementId + 1;
      }

      t.set(incrementIdRef, { lastIncrementId: incrementId });
      t.update(snap.ref, { increment_id: incrementId });
    });

    console.log(`Increment ID set for record ${context.params.recordId}`);
    return null;
  });
