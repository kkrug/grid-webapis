const { db, admin } = require("../helpers/firebase");

exports.receiveUser = async (uid) => {
  let data = {};
  const userRef = await db.collection(`users`).doc(uid).listCollections();
  for (let collection of userRef) {
    const docsRefs = await collection.listDocuments();
    const docs = await db.getAll(...docsRefs);

    for (let documentSnapshot of docs) {
      if (documentSnapshot.exists) {
        data[collection.id] = {
          [documentSnapshot.id]: documentSnapshot.data(),
        };
      }
    }
  }
  return data ? data : {};
};

exports.deleteUsr = async (uid) => {
  const docRef = db.collection(`/users`).doc(uid);
  await db.recursiveDelete(docRef);
  return await admin.auth().deleteUser(uid);
};
