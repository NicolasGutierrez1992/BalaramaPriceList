export async function fetchArticulos() {
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SHEET_NAME = process.env.REACT_APP_SHEET_NAME;

  //`https://docs.google.com/spreadsheets/d/1CPz6JYxp-5kBJlfLZtgudQ_Jndi23U8cT5S0bkjEnj8/edit?usp=sharing
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const rows = data.values || [];
    const json = rows.slice(1).map((row) => ({
      id: row[0],
      titulo: row[1],
      presentacion: row[2],
      cantidad: row[3],
      unidadMedida: row[4],
      precioReal: row[5],
      precio: row[6],
      preciounitario: row[7],
    }));

    return json;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}
