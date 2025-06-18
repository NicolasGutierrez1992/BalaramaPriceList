// src/config/db.js
const { Pool } = require("pg");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../..", ".env"),
});
let pool;

function getDb() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === "true",
    });

    pool
      .connect()
      .then((client) => {
        console.log("Conectado a PostgreSQL");
        client.release();
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err.message);
        process.exit(1);
      });
  }

  return pool;
}

module.exports = getDb();
