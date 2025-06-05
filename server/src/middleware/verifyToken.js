const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // El usuario queda disponible en req.user
    next();
  } catch (err) {
    console.error("Error verificando token:", err.message);
    return res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = verifyToken;
