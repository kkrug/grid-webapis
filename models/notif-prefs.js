const { admin, db } = require("../helpers/firebase");

exports.addNotifPrefsConfig = async (notifPrefs) => {
  return db.collection(`/config`).doc('notif-prefs').set({
    notifPrefs: admin.firestore.FieldValue.arrayUnion(...notifPrefs)
  }, { merge: true });
};

exports.receiveNotifPrefsConfig = async () => {
  const notifPrefsRef = await db.collection(`/config`).doc('notif-prefs').get();
  return notifPrefsRef ? notifPrefsRef.data() : {};
};

exports.updateUserNotifPrefs = async (uid, id, status) => {
  const notifPrefsCol = db.collection(`/users/${uid}/preferences`).doc('notification');
  return await status ?
    notifPrefsCol.set({
      notifPrefs: admin.firestore.FieldValue.arrayUnion(id)
    }, { merge: true }) :
    notifPrefsCol.set({
      notifPrefs: admin.firestore.FieldValue.arrayRemove(id)
    }, { merge: true });
};

exports.receiveUsersNotifPrefs = async (uid) => {
  const notifPrefsRef = await db.collection(`/users/${uid}/preferences`).doc('notification').get();
  return notifPrefsRef ? notifPrefsRef.data() : {};
};
