require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
