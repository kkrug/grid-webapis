const { db } = require("../helpers/firebase");

exports.storePopularTopics = async (sectionId, articles) => {
  return db.collection(`popular-topics`).doc(sectionId).set(Object.assign({}, articles));
};

exports.recievePopularTopics = async (sectionId) => {
  const docRef = await db
      .collection(`popular-topics`).doc(sectionId).get();
 return docRef ? docRef.data() : {};
};