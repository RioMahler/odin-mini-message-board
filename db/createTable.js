const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

`;

async function populateDB() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.HOST,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

module.exports = populateDB;
