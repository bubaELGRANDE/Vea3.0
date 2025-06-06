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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseInfo = exports.checkDatabaseConnection = exports.closeDatabase = exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
// ===== IMPORTACIÓN DE ENTIDADES =====
// Entidades principales del sistema
const Users_1 = require("../entity/Users");
const RefreshToken_1 = require("../entity/RefreshToken");
// Entidades de usuarios específicos
const Sellers_1 = require("../entity/Sellers");
const Buyers_1 = require("../entity/Buyers");
// Entidades de catálogos y configuración
const Categories_1 = require("../entity/Categories");
const ArticleStatus_1 = require("../entity/ArticleStatus");
const PublishingStatus_1 = require("../entity/PublishingStatus");
const SaleStatus_1 = require("../entity/SaleStatus");
// Entidades geográficas
const Departments_1 = require("../entity/Departments");
const Municipalities_1 = require("../entity/Municipalities");
// Entidades de publicaciones
const Publishing_1 = require("../entity/Publishing");
const PublishingCategories_1 = require("../entity/PublishingCategories");
const PublishingDesc_1 = require("../entity/PublishingDesc");
const PublishingImg_1 = require("../entity/PublishingImg");
// Entidades de ventas
const Sales_1 = require("../entity/Sales");
const SaleDet_1 = require("../entity/SaleDet");
// Entidades de interacción
const Reviews_1 = require("../entity/Reviews");
const Chat_1 = require("../entity/Chat");
const Payload_1 = require("../entity/Payload");
// Entidades del módulo de autenticación avanzada
const Auth_1 = require("../entity/Auth");
// ===== DETECCIÓN DEL MODO DE EJECUCIÓN =====
const isProduction = env_1.env.NODE_ENV === 'production';
const isDevelopmentWithNodemon = process.env.npm_lifecycle_event === 'dev';
const isStartScript = process.env.npm_lifecycle_event === 'start';
const isTestMode = env_1.env.NODE_ENV === 'test';
// Función para determinar la configuración apropiada
const getExecutionMode = () => {
    if (isTestMode)
        return 'test';
    if (isProduction)
        return 'production';
    if (isDevelopmentWithNodemon)
        return 'dev-watch';
    if (isStartScript)
        return 'development';
    return 'development'; // fallback
};
// ===== CONFIGURACIÓN BASE COMÚN =====
const commonConfig = {
    type: "mysql",
    host: env_1.env.DB_HOST || 'localhost',
    port: parseInt(env_1.env.DB_PORT || '3306'),
    username: env_1.env.DB_USERNAME || 'root',
    password: env_1.env.DB_PASSWORD || '',
    database: env_1.env.DB_DATABASE || 'vea_db',
    // Configuración de entidades
    entities: [
        // === ENTIDADES PRINCIPALES ===
        Users_1.Users,
        RefreshToken_1.RefreshToken,
        // === ENTIDADES DE USUARIOS ===
        Sellers_1.Sellers,
        Buyers_1.Buyers,
        // === ENTIDADES DE CONFIGURACIÓN ===
        Categories_1.Categories,
        ArticleStatus_1.ArticleStatus,
        PublishingStatus_1.PublishingStatus,
        SaleStatus_1.SaleStatus,
        // === ENTIDADES GEOGRÁFICAS ===
        Departments_1.Departments,
        Municipalities_1.Municipalities,
        // === ENTIDADES DE PUBLICACIONES ===
        Publishing_1.Publishing,
        PublishingCategories_1.PublishingCategories,
        PublishingDesc_1.PublishingDesc,
        PublishingImg_1.PublishingImg,
        // === ENTIDADES DE VENTAS ===
        Sales_1.Sales,
        SaleDet_1.SaleDet,
        // === ENTIDADES DE INTERACCIÓN ===
        Reviews_1.Reviews,
        Chat_1.Chat,
        Payload_1.Payload,
        // === ENTIDADES DE AUTENTICACIÓN AVANZADA ===
        Auth_1.UserRefreshToken,
        Auth_1.UserPasswordReset,
        Auth_1.UserLoginAttempt,
        Auth_1.UserSession
    ],
    migrations: ["src/core/migrations/*.ts"],
    subscribers: ["src/core/subscribers/*.ts"]
};
// ===== CONFIGURACIONES ESPECÍFICAS POR MODO =====
// Configuración para desarrollo con nodemon (npm run dev)
const devWatchConfig = Object.assign(Object.assign({}, commonConfig), { synchronize: true, logging: ['query', 'error', 'warn', 'info'], cache: false, dropSchema: false, extra: {
        charset: 'utf8mb4_unicode_ci',
    } });
// Configuración para desarrollo estándar (npm run start)
const developmentConfig = Object.assign(Object.assign({}, commonConfig), { synchronize: true, logging: ['error', 'warn'], cache: false, dropSchema: false, extra: {
        charset: 'utf8mb4_unicode_ci',
    } });
// Configuración para producción
const productionConfig = Object.assign(Object.assign({}, commonConfig), { synchronize: false, logging: ['error'], cache: false, extra: {
        charset: 'utf8mb4_unicode_ci',
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true,
        connectionLimit: 10,
    } });
// Configuración para testing
const testConfig = Object.assign(Object.assign({}, commonConfig), { database: env_1.env.DB_TEST_DATABASE || 'vea_db_test', synchronize: true, logging: false, dropSchema: true });
// ===== SELECCIÓN DE CONFIGURACIÓN =====
const getDataSourceConfig = () => {
    const mode = getExecutionMode();
    switch (mode) {
        case 'production':
            console.log('🚀 Configurando TypeORM para PRODUCCIÓN');
            return productionConfig;
        case 'test':
            console.log('🧪 Configurando TypeORM para TESTING');
            return testConfig;
        case 'dev-watch':
            console.log('🔄 Configurando TypeORM para DESARROLLO con NODEMON (npm run dev)');
            return devWatchConfig;
        case 'development':
            console.log('⚡ Configurando TypeORM para DESARROLLO (npm run start)');
            return developmentConfig;
        default:
            console.log('📝 Configurando TypeORM para DESARROLLO (fallback)');
            return developmentConfig;
    }
};
// ===== INSTANCIA DE DATASOURCE =====
exports.AppDataSource = new typeorm_1.DataSource(getDataSourceConfig());
// ===== FUNCIONES AUXILIARES =====
/**
 * Inicializa la conexión a la base de datos
 * Detecta automáticamente el modo de ejecución
 */
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!exports.AppDataSource.isInitialized) {
            yield exports.AppDataSource.initialize();
            const mode = getExecutionMode();
            console.log(`✅ Base de datos conectada correctamente`);
            console.log(`📊 Modo: ${mode}`);
            console.log(`🗄️  Database: ${exports.AppDataSource.options.database}`);
            console.log(`🔄 Sincronización: ${exports.AppDataSource.options.synchronize}`);
            console.log(`📝 Logging: ${Array.isArray(exports.AppDataSource.options.logging) ?
                exports.AppDataSource.options.logging.join(', ') :
                exports.AppDataSource.options.logging}`);
        }
    }
    catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        throw error;
    }
});
exports.initializeDatabase = initializeDatabase;
/**
 * Cierra la conexión a la base de datos
 */
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (exports.AppDataSource.isInitialized) {
            yield exports.AppDataSource.destroy();
            console.log("🔌 Conexión a la base de datos cerrada");
        }
    }
    catch (error) {
        console.error("❌ Error al cerrar la conexión:", error);
        throw error;
    }
});
exports.closeDatabase = closeDatabase;
/**
 * Verifica el estado de la conexión
 */
const checkDatabaseConnection = () => {
    return exports.AppDataSource.isInitialized;
};
exports.checkDatabaseConnection = checkDatabaseConnection;
/**
 * Obtiene información sobre la configuración actual
 */
const getDatabaseInfo = () => {
    const options = exports.AppDataSource.options; // Type assertion para acceder a propiedades específicas de MySQL
    return {
        mode: getExecutionMode(),
        isInitialized: exports.AppDataSource.isInitialized,
        database: options.database,
        synchronize: options.synchronize,
        logging: options.logging,
        host: options.host,
        port: options.port
    };
};
exports.getDatabaseInfo = getDatabaseInfo;
// ===== CONFIGURACIÓN POR DEFECTO =====
exports.default = exports.AppDataSource;
