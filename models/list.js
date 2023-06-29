const { admin, db } = require("../helpers/firebase");
const { LIST_PRESENT, LIST_NOT_PRESENT, BOOKMARK_LIST } = require('../helpers/constants');

exports.createMyList = async (uid, name) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(name).get();
  if (listCol.exists) {
    return LIST_PRESENT;
  }
  return await db
    .collection(`/users/${uid}/lists`).doc(name)
    .set({ exists: true });
};

exports.deleteMyList = async (uid, name) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(name).get();
  if (listCol.exists) {
    return await db.collection(`/users/${uid}/lists`).doc(name).delete();;
  }
};

exports.addItemToUsersList = async (uid, listName, item, img) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(listName).get();
  if (!listCol.exists) {
    return LIST_NOT_PRESENT;
  }
  await db
    .collection(`/users/${uid}/lists`).doc(listName).update({
      'img': img
    });

  return await db
    .collection(`/users/${uid}/lists`).doc(listName)
    .set({
      [item.id]: item
    }, { merge: true });
};

exports.addItemToDBList = async (uid, item) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST).get();
  if (!listCol.exists) {
    await db
      .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST)
      .set({ exists: true });
  }

  return await db
    .collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST)
    .set({
      [item.id]: item
    }, { merge: true });
};

exports.receiveItemsFromDBList = async (uid) => {
  return await db.collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST).get();
};

exports.deleteItemFromDBList = async (uid, itemId) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(BOOKMARK_LIST);
  return await listCol.update({
    [itemId]: admin.firestore.FieldValue.delete()
  });
};

exports.deleteItemFromUsersList = async (uid, listName, itemId) => {
  const listCol = await db.collection(`/users/${uid}/lists`).doc(listName);
  return await listCol.update({
    [itemId]: admin.firestore.FieldValue.delete()
  });
};

exports.receiveAllListItems = async (uid) => {
  return await db.collection(`/users/${uid}/lists`).get();
};

exports.receiveItemsForList = async (uid, list) => {
  return await db.collection(`/users/${uid}/lists`).doc(list).get();
};
