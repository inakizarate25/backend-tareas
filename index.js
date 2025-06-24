// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas (las vamos a crear luego)
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `🚀 Servidor corriendo en el puerto https://localhost:${
          process.env.PORT || 4000
        }`
      );
    });
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));
