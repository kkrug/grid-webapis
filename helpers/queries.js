//register user query
const registerUserQuery = () => {
  const query = `INSERT INTO users (email, firebase_uid, do_not_share_opt_out) 
   VALUES (PGP_SYM_ENCRYPT($1,'${process.env.PG_SECRET_KEY}'),$2 , $3) 
   RETURNING id`;
  return query;
};

//Get User By Email
const fetchUserByEmailQuery = (email) => {
  const query = `SELECT id FROM users 
                 WHERE PGP_SYM_DECRYPT(email::bytea, '${process.env.PG_SECRET_KEY}') 
                 = '${email}';`;
  return query;
};

//Get categories
const fetchCategoriesQuery = () => {
  const query = `SELECT id, name FROM category`;
  return query;
};

//add subscription
const addSubscriptionQuery = () => {
  const query =
    "WITH sub_id AS (INSERT INTO subscription (name, audience_id, active, category_id) " +
    "VALUES ($1, $2, $3, $4) RETURNING id as subscription_id)" +
    "INSERT INTO audit_log (subscription_id, action_name, action_user, action_datetime)" +
    "SELECT subscription_id, 'add', $5, CURRENT_TIMESTAMP FROM sub_id";
  return query;
};

//delete subscription
const deleteSubscriptionQuery = () => {
  const query =
    `WITH sub_id AS (DELETE FROM subscription WHERE id=$1 RETURNING id as subscription_id)` +
    `INSERT INTO audit_log (subscription_id, action_name, action_user, action_datetime)` +
    `SELECT subscription_id, 'delete', $2, CURRENT_TIMESTAMP FROM sub_id`;
  return query;
};

//update subscription
const updateSubscriptionQuery = () => {
  const query =
    `WITH sub_id AS (UPDATE subscription SET name=$2, audience_id=$3, category_id=$4 WHERE id=$1 RETURNING id as subscription_id)` +
    `INSERT INTO audit_log (subscription_id, action_name, action_user, action_datetime)` +
    `SELECT subscription_id, 'update', $5, CURRENT_TIMESTAMP FROM sub_id`;
  return query;
};

//count subscription
const rowsCountQuery = (table) => {
  const query = `SELECT COUNT(*) FROM ${table}`;
  return query;
};

//update sequence value
const updateSequenceValQuery = (name, val) => {
  const query = `SELECT SETVAL('${name}', ${val})`;
  return query;
};

//existing subscriptions query
const currentSubscripitonsWithUidQuery = (email) => {
  const query = `SELECT s.name AS sname, 
                 s.audience_id AS saudienceid,
                 u.do_not_share_opt_out AS udonotshareoptout,
                 u.id AS uid 
                 FROM subscription s 
                 JOIN users_subscription_mapping usm  
                 ON s.id = usm.subscription_id JOIN users u 
                 ON u.id = usm.user_id 
                 WHERE PGP_SYM_DECRYPT(u.email::bytea, '${process.env.PG_SECRET_KEY}') 
                 = '${email}';`;
  return query;
};

const usersCurSubsDynamicSelQuery = (selFields, email) => {
  const query = `SELECT ${selFields} 
                 FROM subscription s 
                 JOIN users_subscription_mapping usm  
                 ON s.id = usm.subscription_id JOIN users u 
                 ON u.id = usm.user_id 
                 WHERE PGP_SYM_DECRYPT(u.email::bytea, '${process.env.PG_SECRET_KEY}') 
                 = '${email}';`;
  return query;
};

//all subscriptions
const allSubscriptionsQuery = () => {
  const query = `SELECT s.id, s.name, s.audience_id, 
                 c.name as category_name 
                 FROM subscription s LEFT OUTER JOIN category c 
                 ON s.category_id = c.id;`;
  return query;
};

//add user's subscriptions
const addUsersSubscriptionQuery = () => {
  const query = `INSERT INTO users_subscription_mapping 
                 (user_id, subscription_id) VALUES ($1, $2) 
                 RETURNING subscription_id;`;
  return query;
};

//delete user's subscriptions
const deleteUsersSubscriptionQuery = (uid, sid) => {
  const query = `DELETE FROM users_subscription_mapping usm 
                 WHERE usm.user_id = ${uid} 
                 AND usm.subscription_id = ${sid} 
                 RETURNING subscription_id;`;
  return query;
};

const deleteUserByIdQuery = (uid) => {
  const query = `DELETE FROM users u WHERE u.id = ${uid} RETURNING id;`;
  return query;
};

//Commit Query
const commitQuery = () => {
  const query = `COMMIT;`;
  return query;
};

const setDoNotShareFlagQuery = (email, doNotShareFlag, sender) => {
  const query = `WITH uid AS (UPDATE users SET do_not_share_opt_out = ${doNotShareFlag} 
                 WHERE PGP_SYM_DECRYPT(email::bytea, '${process.env.PG_SECRET_KEY}') = '${email}' RETURNING id as user_id)
                 INSERT INTO audit_log (subscription_id, action_name, action_user, action_datetime)
                 SELECT user_id, 'do not share opt out', '${sender}', CURRENT_TIMESTAMP FROM uid;`;
  return query;
};

const setDoNotShareFlagByUidQuery = (uid, doNotShareFlag) => {
  const query = `UPDATE users 
                 SET do_not_share_opt_out = ${doNotShareFlag} 
                 WHERE id = ${uid};`;
  return query;
};
const testEncryptInsertQuery = (secKey) => {
  const query = `INSERT INTO test1 (name, email) 
                 VALUES ($1, PGP_SYM_ENCRYPT($2,'${secKey}'))
                 RETURNING id;`;
  return query;
};

const testEncryptFetchQuery = (secKey, email) => {
  const query = `SELECT id, name, PGP_SYM_DECRYPT(email::bytea, '${secKey}') AS email
                 FROM test1 
                 WHERE PGP_SYM_DECRYPT(email::bytea, '${secKey}') = '${email}';`;
  return query;
};

module.exports = {
  registerUserQuery,
  fetchUserByEmailQuery,
  fetchCategoriesQuery,
  addSubscriptionQuery,
  deleteSubscriptionQuery,
  updateSubscriptionQuery,
  rowsCountQuery,
  updateSequenceValQuery,
  currentSubscripitonsWithUidQuery,
  allSubscriptionsQuery,
  addUsersSubscriptionQuery,
  deleteUsersSubscriptionQuery,
  commitQuery,
  setDoNotShareFlagQuery,
  setDoNotShareFlagByUidQuery,
  testEncryptInsertQuery,
  testEncryptFetchQuery,
  usersCurSubsDynamicSelQuery,
  deleteUserByIdQuery,
};
