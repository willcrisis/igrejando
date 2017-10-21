const admin = require('firebase-admin');
const config = require('../../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: process.env.REACT_APP_DATABASE_URL
});

module.exports = {
  validateToken: async(token) => {
    return await admin.auth().verifyIdToken(token);
  }
};
