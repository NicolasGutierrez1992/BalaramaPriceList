const express = require("express");
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Middleware verifyToken para proteger la ruta
router.post("/order", verifyToken, async (req, res) => {
  const usuario = req.user; // Viene del token validado
  const { cart } = req.body;
console.log("Datos del pedido:", { usuario, cart });
  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Carrito vacío o no enviado" });
  }

  if (!usuario.email) {
    return res.status(400).json({ error: "Usuario no válido" });
  }

  const fecha = new Date().toLocaleString();

  const plainList = cart
    .map((item) => `${item.quantity} x ${item.titulo} (${item.tipo})`)
    .join("\n");
  const htmlList = cart
    .map((item) => `<li>${item.quantity} x ${item.titulo} (${item.tipo})</li>`)
    .join("");

  const mailToOwner = {
    from: `"Balarama" <${process.env.MAIL_USER}>`,
    to: process.env.DESTINO_PEDIDOS,
    subject: `Nuevo pedido de ${usuario.nombre}`,
    text: `Se recibió un nuevo pedido:\n\nNombre: ${usuario.razonsocial}\nEmail: ${usuario.email}\nFecha: ${fecha}\n\nProductos:\n${plainList}`,
  };

  const mailToCustomer = {
    from: `"Balarama" <${process.env.MAIL_USER}>`,
    to: `"${usuario.email}>`,
    subject: "Confirmación de pedido - Balarama",
    html: `
    <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="text-align: center; color: #2c3e50;">¡Gracias por tu pedido!</h2>
      <p>Hola <strong>${usuario.razonsocial}</strong>,</p>
      <p>Recibimos tu pedido y nos pondremos en contacto con vos a la brevedad.</p>
      <h3>Resumen del pedido:</h3>
      <ul>${htmlList}</ul>
      <hr />
      <p style="text-align: center;">¡Gracias por elegir Balarama! 🌱</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToCustomer);
    res.status(200).json({ message: "Pedido enviado con éxito" });
  } catch (error) {
    console.error(
      "Error enviando mail:",
      error.response || error.message || error
    );
    res.status(500).json({ error: "Error al enviar el email del pedido" });
  }
});

module.exports = router;
