const pool = require("../config/db");

async function listTables() {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log("Tablas en la base de datos:");
    result.rows.forEach((row) => console.log(`- ${row.table_name}`));
  } catch (err) {
    console.error("Error al listar las tablas:", err);
  } finally {
    pool.end();
  }
}

listTables();
