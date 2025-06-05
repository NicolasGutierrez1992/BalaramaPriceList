const db = require("../config/db");

const tableName = process.argv[2]; // Le pasás el nombre por consola

if (!tableName) {
  console.error(
    "⚠️  Tenés que pasar el nombre de la tabla. Ej: node scripts/inspectTable.js cliente"
  );
  process.exit(1);
}

(async () => {
  try {
    const result = await db.query(`SELECT * FROM ${tableName}`);
    console.log(`Registros de la tabla '${tableName}':`);
    console.table(result.rows);
  } catch (err) {
    console.error("Error al consultar la tabla:", err.message);
  } finally {
    db.end(); // Cerramos conexión del pool
  }
})();
