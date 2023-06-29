const { admin, db } = require("../helpers/firebase");

exports.updateFollowedSections = async (uid, follow_sections, unfollow_sections) => {
  const followSectionRef = db.collection(`/users/${uid}/sections`).doc('followed');
  const batch = db.batch();

  follow_sections?.length ? batch.set(followSectionRef, { sectionIds: admin.firestore.FieldValue.arrayUnion(...follow_sections) }, { merge: true }) : null;
  unfollow_sections?.length ? batch.set(followSectionRef, { sectionIds: admin.firestore.FieldValue.arrayRemove(...unfollow_sections) }, { merge: true }) : null;

  batch.commit();
};

exports.receiveFollowedSections = async (uid) => {
  const followSectionRef = await db
  .collection(`/users/${uid}/sections`).doc('followed').get();
 return followSectionRef ? followSectionRef.data() : {};
};