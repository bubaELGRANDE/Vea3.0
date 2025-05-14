import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./confi/data-source";

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

app.get("/", (req: Request, res: Response) => {
  res.send("¡Bienvenido a la API de Node.js + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto http://localhost:${PORT}`);
});