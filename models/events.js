/* istanbul ignore file */
const {db } = require("../helpers/firebase");

exports.storeEvents = async (contentAlias, events) => {
  return await db.collection(`events`).doc(contentAlias).set(Object.assign({}, events));
};

exports.recieveEvents = async (contentAlias) => {
  const docRef = await db
      .collection(`events`).doc(contentAlias).get();
 return docRef ? docRef.data() : {};
};