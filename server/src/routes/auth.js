const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();

// Login
router.post("/login", async (req, res) => {
  const { docnum, password } = req.body;

  if (!docnum || !password) {
    return res
      .status(400)
      .json({ message: "Document and password are required" });
  }

  try {
    const user = await User.getUserByEmail(docnum);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("password", password);
    console.log("user.pass", user.pass);
    const isMatch = await bcrypt.compare(password, user.pass);
    console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id_cliente, email: user.mail, razonsocial: user.razonsocial },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id_cliente,
        docnum: user.docnum,
        mail: user.mail,
        razonsocial: user.razonsocial,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
