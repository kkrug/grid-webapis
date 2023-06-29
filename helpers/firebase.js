const admin = require("firebase-admin");
const config = require("config");
const atob = require("atob");

admin.initializeApp({
  credential: admin.credential.cert({
    type: config.get("firebase.type"),
    project_id: config.get("firebase.project_id"),
    client_email: config.get("firebase.client_email"),
    client_id: config.get("firebase.client_id"),
    auth_uri: config.get("firebase.auth_uri"),
    token_uri: config.get("firebase.token_uri"),
    auth_provider_x509_cert_url: config.get(
      "firebase.auth_provider_x509_cert_url"
    ),
    client_x509_cert_url: config.get("firebase.client_x509_cert_url"),
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: atob(process.env.FIREBASE_PRIVATE_KEY),
  }),
});

const db = admin.firestore();
module.exports = { admin, db };
