/* istanbul ignore file */
const { admin, db } = require("../helpers/firebase");

exports.receiveAttendingEvents = async (uid) => {
  const docRef = await db
  .collection(`/users/${uid}/attend`).doc('events').get();
 return docRef ? docRef.data() : {};
};

exports.addAttendingEvent = async (uid, eventId) => {
  return await db
    .collection(`/users/${uid}/attend`).doc('events')
    .set({
      eventIds: admin.firestore.FieldValue.arrayUnion(eventId)
  }, { merge: true });
};

exports.deleteAttendingEvent = async (uid, eventId) => {
  return await db
  .collection(`/users/${uid}/attend`).doc('events')
  .set({
    eventIds: admin.firestore.FieldValue.arrayRemove(eventId)
}, { merge: true });
};
