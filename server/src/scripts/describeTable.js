// scripts/describeTable.js
const pool = require("../config/db");

const tableName = process.argv[2]; // le pasás el nombre por terminal

if (!tableName) {
  console.error(
    "Tenés que pasar el nombre de la tabla. Ej: node describeTable.js users"
  );
  process.exit(1);
}

async function describeTable() {
  try {
    const result = await pool.query(
      `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
    `,
      [tableName]
    );

    console.log(`Columnas de la tabla '${tableName}':`);
    result.rows.forEach((col) => {
      console.log(
        `- ${col.column_name} (${col.data_type}) ${
          col.is_nullable === "NO" ? "NOT NULL" : ""
        }`
      );
    });
  } catch (err) {
    console.error("Error al describir la tabla:", err);
  } finally {
    pool.end();
  }
}

describeTable();
