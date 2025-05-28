<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import { rutas } from "./core/confi/rutas";
import { AppDataSource } from "./core/confi/data-source";
import { env } from "process";
=======
import dotenv from "dotenv";
>>>>>>> main

// Configurar dotenv ANTES de cualquier otra importación
dotenv.config();

import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { rutas } from "./core/confi/rutas";
import { AppDataSource } from "./core/confi/data-source";
import { env } from "./core/confi/env";

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error: any) => {
    console.error("Error al conectar con la base de datos:", error);
  });

const app = express();
const PORT = env.PORT || 3000;

<<<<<<< HEAD
app.use(express.json());
app.use("/api", rutas);
=======
// Middleware de seguridad
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(env.RATE_LIMIT_WINDOW || '900000'), // 15 minutos
  max: parseInt(env.RATE_LIMIT_MAX_REQUESTS || '100'), // límite de requests por ventana
  message: {
    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
>>>>>>> main

app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/api", rutas);

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto http://localhost:${PORT}/api`);
});