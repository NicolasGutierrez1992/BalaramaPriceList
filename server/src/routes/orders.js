const express = require("express");
const nodemailer = require("nodemailer");
const moment = require('moment-timezone');
const verifyToken = require("../middleware/verifyToken");
const {createOrder,createOrderDetail} = require("../models/Order");

const router = express.Router();

const transporter = nodemailer.createTransport({
  /*service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },*/
   host: "smtp.gmail.com",
  port: 465, // Usa 587 si prefieres STARTTLS
  secure: true, // true para 465, false para 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },

});

// Middleware verifyToken para proteger la ruta
router.post("/order", verifyToken, async (req, res) => {
  const usuario = req.user; // Viene del token validado
  const { cart , comentario} = req.body;
  const id_Client = usuario.id; // ID del usuario autenticado
  const cantidaditems = cart.reduce((total, item) => total + item.quantity, 0);
  const fecharecepcion =  moment().tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss"); // Fecha de recepción en formato adecuado
  const estado = "Pendiente"; // Estado inicial del pedido
  
  // Validación de datos
  console.log("Datos del pedido:", { usuario, cart, comentario, id_Client, cantidaditems, fecharecepcion, estado });

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Carrito vacío o no enviado" });
  }

  if (!usuario.email) {
    return res.status(400).json({ error: "Usuario no válido" });
  }

  const fecha = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });

  const plainList = cart
    .map((item) => `${item.quantity} x ${item.id} - ${item.titulo} (${item.tipo})`)
    .join("\n");
  const htmlList = cart
    .map((item) => `<li>${item.quantity} x ${item.titulo} (${item.tipo}) </li>`)
    .join("");

  const mailToOwner = {
    from: `"Balarama" <${process.env.MAIL_USER}>`,
    to: process.env.DESTINO_PEDIDOS,
    subject: `Nuevo pedido de ${usuario.razonsocial}`,
    text: `Se recibió un nuevo pedido:\n\nNombre: ${usuario.razonsocial}\nEmail: ${usuario.email}\nFecha: ${fecha}\n\nProductos:\n${plainList} \n\nComentario: ${comentario}`
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
      <p><stong>Comentario:</strong> ${comentario || "Ninguno"}</p>
      <hr />
      <p style="text-align: center;">¡Gracias por elegir Balarama! 🌱</p>
    </div>
  `  
  };

  try {
    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToCustomer);
    console.log("Emails enviados correctamente");
  } catch (error) {
    console.error(
      "Error enviando mail:",
      error.response || error.message || error
    );
    res.status(500).json({ error: "Error del servidor al enviar el email del pedido" });
  }

  //Almacenar el pedido en la base de datos (opcional)
  try {
    const order = await createOrder({id_Client, cantidaditems, fecharecepcion, estado, comentario});
    if (!order) {
      return res.status(500).json({ error: "Error al crear el pedido en la base de datos" });
    }
    console.log("Pedido guardado en la base de datos:", order);
    // Guardar los detalles del pedido
    for (const item of cart) {
      const details = {
        id_pedido: order.id_pedido, // Asignar el ID del pedido creado
        id_articulo: item.id,
        cantidad: item.quantity,
        presentacion: item.tipo || "unidad" // Usar 'unidad' como valor por defecto si no se especifica
      };
      const detail = await createOrderDetail(details);
      if (!detail) {
        return res.status(500).json({ error: "Error al crear los detalles del pedido en la base de datos" });
      }
       console.log("Detalle del pedido guardado:", detail);
    }
     res.status(200).json({ message: "Pedido solicitado con éxito" });
  } catch (error) {
    console.error("Error guardando el pedido en la base de datos:", error);
    return res.status(500).json({ error: "Error al guardar el pedido en la base de datos" });
  }

});

module.exports = router;
