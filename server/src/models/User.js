const pool = require("../config/db");

const getUserByEmail = async (docnum) => {
  const query = "SELECT * FROM cliente WHERE docnum = $1";
  const result = await pool.query(query, [docnum]);
  return result.rows[0];
};

const createUser = async (userData) => {
  const {
    doctipo,
    docnum,
    condicioniva,
    direccion,
    telefono,
    mail,
    contacto,
    pass,
    razonsocial,
  } = userData;

  const query = `
    INSERT INTO cliente (doctipo, docnum, condicioniva, direccion, telefono, mail, contacto, pass, razonsocial)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    doctipo,
    docnum,
    condicioniva,
    direccion,
    telefono,
    mail,
    contacto,
    pass,
    razonsocial,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  getUserByEmail,
  createUser,
};
