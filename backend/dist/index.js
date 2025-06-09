"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Configurar dotenv ANTES de cualquier otra importación
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rutas_1 = require("./core/confi/rutas");
const data_source_1 = require("./core/confi/data-source");
const env_1 = require("./core/confi/env");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Función para inicializar la aplicación
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializar la base de datos con configuración automática
            yield (0, data_source_1.initializeDatabase)();
            // Mostrar información de la configuración actual
            const dbInfo = (0, data_source_1.getDatabaseInfo)();
            console.log(`🚀 Aplicación iniciada en modo: ${dbInfo.mode}`);
            const app = (0, express_1.default)();
            const PORT = env_1.env.PORT || 3000;
            // Cargar YAML
            const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../openapi.yaml'));
            // uso de cors de consutlas
            app.use((0, cors_1.default)({
                origin: 'http://localhost:4200',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true
            }));
            // Middleware Swagger
            app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
            // Middleware de seguridad
            app.use((0, helmet_1.default)());
            app.use((0, compression_1.default)());
            // Rate limiting
            const limiter = (0, express_rate_limit_1.default)({
                windowMs: parseInt(env_1.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutos
                max: parseInt(env_1.env.RATE_LIMIT_MAX_REQUESTS || '100'), // límite de requests por ventana
                message: {
                    error: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
                },
                standardHeaders: true,
                legacyHeaders: false,
            });
            app.use('/api', limiter);
            app.use(express_1.default.json({ limit: '10mb' }));
            app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
            app.use('/api/files', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
            app.use("/api", rutas_1.rutas);
            app.listen(PORT, () => {
                console.log(`🌐 Servidor corriendo en http://localhost:${PORT}/api`);
                console.log('Swagger disponible en http://localhost:3000/api-docs');
                console.log(`📊 Modo de base de datos: ${dbInfo.mode}`);
                console.log(`🗄️  Base de datos: ${dbInfo.database}`);
            });
        }
        catch (error) {
            console.error("❌ Error al inicializar la aplicación:", error);
            process.exit(1);
        }
    });
}
// Iniciar la aplicación
startApplication();
