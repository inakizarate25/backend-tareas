const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Servidor en puerto ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => console.error("❌ Error de conexión MongoDB:", err));
