const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

`;
console.log("DB_HOST:", process.env.DB_HOST);
async function populateDB() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

module.exports = populateDB;
