const { db } = require("../helpers/firebase");

exports.storeRecommendedVideos = async (sectionId, videos) => {
  return db.collection(`recommended-videos`).doc(sectionId).set(Object.assign({}, videos));
};

exports.recieveRecommendedVideos = async (sectionId) => {
  const docRef = await db
      .collection(`recommended-videos`).doc(sectionId).get();
 return docRef ? docRef.data() : {};
};
