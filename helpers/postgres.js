const { Client } = require("pg");

const credentials = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PWD,
  port: process.env.PG_PORT,
};

//Open Connection
const openCon = async () => {
  const client = new Client(credentials);
  await client.connect();
  return client;
};

//Close Connection
const closeCon = async (client) => {
  await client.end();
};

//test connection
const testCon = async (client) => {
  const now = await client.query("SELECT NOW()");
  return now;
};

module.exports = { openCon, closeCon, testCon };
