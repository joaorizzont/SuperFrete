const functions = require('firebase-functions');
const userController = require('./user.controller');

exports.createUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const data = req.body;
    await userController.createUser(data);

    res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

exports.getUser = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const id = req.path.split('/').pop();
    const user = await userController.getUser(id);
    res.status(200).json({ message: "User successfully found!", data: user });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
