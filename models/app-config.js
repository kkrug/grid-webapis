const { db } = require("../helpers/firebase");

exports.addAppConfigs = async (appConfigs) => {
  return await db
    .collection(`config`)
    .doc(`app`)
    .set(Object.assign({}, appConfigs));
};

exports.receiveAppConfigs = async () => {
  const configRef = await db.collection(`config`).doc(`app`).get();
  return configRef ? configRef.data() : {};
};

exports.receiveAppConfigsV2 = async () => {
  const configRef = db.collection(`config`).doc(`app`);
  const cacheRef = db.collection(`config`).doc(`cache`);
  const dropCardsRef = db.collection(`config`).doc(`drop-cards`);
  const modalsRef = db.collection(`config`).doc(`modals`);

  const docs = await db.getAll(configRef, cacheRef, dropCardsRef, modalsRef);
  return docs ? docs : {};
};
