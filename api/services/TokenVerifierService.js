const admin = require('firebase-admin');
const config = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

module.exports = {
  validateToken: async(token) => {
    return await admin.auth().verifyIdToken(token);
  }
};
