import dotenv from "dotenv";

// Configurar dotenv ANTES de cualquier otra importación
dotenv.config();

import express from "express";
import helmet from "helmet"; // Middleware para seguridad básica de cabeceras HTTP
import compression from "compression"; // Middleware para comprimir las respuestas HTTP
import rateLimit from "express-rate-limit"; // Middleware para limitar la tasa de peticiones
import cors from "cors"; // Middleware para habilitar CORS
import { rutas } from "./core/confi/rutas"; // Tus definiciones de rutas
import { initializeDatabase, getDatabaseInfo } from "./core/confi/data-source"; // Lógica de base de datos
import { env } from "./core/confi/env"; // Variables de entorno

// Función para inicializar la aplicación
async function startApplication() {
  try {
    // Inicializar la base de datos
    await initializeDatabase();

    // Mostrar información de la configuración actual de la base de datos
    const dbInfo = getDatabaseInfo();
    console.log(`🚀 Aplicación iniciada en modo: ${dbInfo.mode}`);

    const app = express();
    const PORT = env.PORT || 3000;

    // --- Configuración de CORS ---
    // Es importante colocar esto ANTES de tus rutas y, a menudo, antes de otros middlewares
    // que podrían finalizar la petición o necesitar que las cabeceras CORS ya estén presentes.
    const corsOptions = {
      origin: 'http://localhost:4200', // Origen de tu aplicación Angular en desarrollo
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos HTTP permitidos
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With', // Cabeceras permitidas
      credentials: true, // Permite enviar cookies o cabeceras de autorización si es necesario
      optionsSuccessStatus: 200 // Para compatibilidad con navegadores antiguos o clientes específicos
    };
    app.use(cors(corsOptions));
    // Habilitar pre-flight requests para todas las rutas si es necesario (a menudo manejado por cors(corsOptions))
    // app.options('*', cors(corsOptions));


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
      console.log(`🌐 Servidor Express corriendo en http://localhost:${PORT}`);
      console.log(`🔗 Rutas API disponibles bajo http://localhost:${PORT}/api`);
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
