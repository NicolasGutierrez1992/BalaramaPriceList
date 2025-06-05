const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tucorreo@gmail.com",
    pass: "tu-clave-app", // idealmente también meter en .env
  },
});

module.exports = { transporter };
