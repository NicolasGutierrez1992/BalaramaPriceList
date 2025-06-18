const nodemailer = require("nodemailer");
const DEV = process.env.NODE_ENV !== "production"; // Verifica si está en modo desarrollo

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tucorreo@gmail.com",
    pass: "tu-clave-app", // idealmente también meter en .env
  },
  tls: {
    rejectUnauthorized: (DEV)?false:true, // Desactiva la verificación de certificados
  },

});

module.exports = { transporter };
