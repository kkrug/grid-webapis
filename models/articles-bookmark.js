const { admin, db } = require("../helpers/firebase");
const { BOOKMARK_LIST } = require("../helpers/constants");

exports.receiveBookMarkedArticles = async (uid) => {
  const docRef = await db
    .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST).get();
  return docRef ? docRef.data() : null;
};

exports.bookmarkArticle = async (uid, item, img) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST).get();
  if (!listCol.exists) {
    await db
      .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST)
      .set({ exists: true });
  }
  await db
    .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST).update({
      'img': img
    });

  return await db
    .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST)
    .set({
      [item.id]: item
    }, { merge: true });
};

exports.deleteBookMarkedArticle = async (uid, id) => {
  const bookMarkCol = await db.collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST);

  return await bookMarkCol.update({
    [id]: admin.firestore.FieldValue.delete()
  });
};
