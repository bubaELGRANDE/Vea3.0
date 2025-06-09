import dotenv from "dotenv";

// Configurar dotenv ANTES de cualquier otra importación
dotenv.config();

import express from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { rutas } from "./core/confi/rutas";
import { initializeDatabase, getDatabaseInfo } from "./core/confi/data-source";
import { env } from "./core/confi/env";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';

// Función para inicializar la aplicación
async function startApplication() {
  try {
    // Inicializar la base de datos
    await initializeDatabase();

    // Mostrar información de la configuración actual
    const dbInfo = getDatabaseInfo();
    console.log(`🚀 Aplicación iniciada en modo: ${dbInfo.mode}`);    const app = express();
    const PORT = env.PORT || 3000;

    // Cargar YAML
    const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
  
    // uso de cors de consutlas
    app.use(cors({
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));

    // Middleware Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Middleware de seguridad
    app.use(helmet());
    app.use(compression());


    // Middlewares generales
    app.use(helmet()); // Ayuda a securizar tu app Express estableciendo varias cabeceras HTTP
    app.use(compression()); // Comprime las respuestas para mejorar el rendimiento

    // Middleware para parsear JSON y URL-encoded data
    app.use(express.json({ limit: '10mb' })); // Limita el tamaño del payload JSON
    app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limita el tamaño del payload URL-encoded

    // Rate limiting (limitador de tasa de peticiones)
    // Aplicar ANTES de las rutas que quieres proteger
    const limiter = rateLimit({
      windowMs: parseInt(env.RATE_LIMIT_WINDOW || '900000'), // 15 minutos por defecto
      max: parseInt(env.RATE_LIMIT_MAX_REQUESTS || '100'), // Límite de 100 requests por IP por ventana
      message: {
        error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
      },
      standardHeaders: true, // Devuelve información del rate limit en las cabeceras `RateLimit-*`
      legacyHeaders: false, // Deshabilita las cabeceras `X-RateLimit-*` (legacy)
    });

    // Aplicar el rate limiter a todas las rutas bajo /api
    app.use('/api', limiter);


    // Montar tus rutas principales
    // Asumiendo que `rutas` es un router de Express que define endpoints como /sales, /users, etc.
    // y que el frontend hace peticiones a `http://localhost:3000/api/sales` (sin /v1)
    app.use("/api", rutas);


    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🌐 Servidor corriendo en http://localhost:${PORT}/api`);
      console.log('Swagger disponible en http://localhost:3000/api-docs');
      console.log(`📊 Modo de base de datos: ${dbInfo.mode}`);
      console.log(`🗄️ Base de datos: ${dbInfo.database}`);
    });

  } catch (error) {
    console.error("❌ Error al inicializar la aplicación:", error);
    process.exit(1); // Salir del proceso si hay un error crítico en la inicialización
  }
}

// Iniciar la aplicación
startApplication();
