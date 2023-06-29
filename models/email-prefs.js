const { admin, db } = require("../helpers/firebase");

exports.addEmailPrefsConfig = async (emailPrefs) => {
  const emailPrefsConfig = db.collection(`/config`).doc('email-prefs');
  await emailPrefsConfig.delete();
  return await emailPrefsConfig.set({
    emailPrefs: admin.firestore.FieldValue.arrayUnion(...emailPrefs)
  }, { merge: true });
};

exports.receiveEmailPrefsConfig = async () => {
  const emailPrefsRef = await db.collection(`/config`).doc('email-prefs').get();
  return emailPrefsRef ? emailPrefsRef.data() : {};
};

exports.updateUserEmailPrefs = async (uid, id, status) => {
  const emailPrefsCol = db.collection(`/users/${uid}/preferences`).doc('email');
  return await status ?
    emailPrefsCol.set({
      emailPrefs: admin.firestore.FieldValue.arrayUnion(id)
    }, { merge: true }) :
    emailPrefsCol.set({
      emailPrefs: admin.firestore.FieldValue.arrayRemove(id)
    }, { merge: true });
};

exports.receiveUsersEmailPrefs = async (uid) => {
  const emailPrefsRef = await db.collection(`/users/${uid}/preferences`).doc('email').get();
  return emailPrefsRef ? emailPrefsRef.data() : {};
};
