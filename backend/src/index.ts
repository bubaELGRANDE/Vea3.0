import express from "express";
import dotenv from "dotenv";
import { rutas } from "./core/confi/rutas";
import { AppDataSource } from "./core/confi/data-source";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", rutas);

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto http://localhost:${PORT}/api`);
});