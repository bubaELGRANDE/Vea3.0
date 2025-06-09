import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "./env";

// ===== IMPORTACIÓN DE ENTIDADES =====
// Entidades principales del sistema
import { Users } from "../entity/Users";
import { RefreshToken } from "../entity/RefreshToken";

// Entidades de usuarios específicos
import { Sellers } from "../entity/Sellers";
import { Buyers } from "../entity/Buyers";

// Entidades de catálogos y configuración
import { Categories } from "../entity/Categories";
import { ArticleStatus } from "../entity/ArticleStatus";
import { PublishingStatus } from "../entity/PublishingStatus";
import { SaleStatus } from "../entity/SaleStatus";

// Entidades geográficas
import { Departments } from "../entity/Departments";
import { Municipalities } from "../entity/Municipalities";

// Entidades de publicaciones
import { Publishing } from "../entity/Publishing";
import { PublishingCategories } from "../entity/PublishingCategories";
import { PublishingDesc } from "../entity/PublishingDesc";
import { PublishingImg } from "../entity/PublishingImg";

// Entidades de ventas
import { Sales } from "../entity/Sales";
import { SaleDet } from "../entity/SaleDet";

// Entidades de interacción
import { Reviews } from "../entity/Reviews";
import { Chat } from "../entity/Chat";
import { Payload } from "../entity/Payload";

// Entidades del módulo de autenticación avanzada
import { 
    UserRefreshToken, 
    UserPasswordReset, 
    UserLoginAttempt, 
    UserSession 
} from "../entity/Auth";

// ===== DETECCIÓN DEL MODO DE EJECUCIÓN =====
const isProduction = env.NODE_ENV === 'production';
const isDevelopmentWithNodemon = process.env.npm_lifecycle_event === 'dev';
const isStartScript = process.env.npm_lifecycle_event === 'start';
const isTestMode = env.NODE_ENV === 'test';

// Función para determinar la configuración apropiada
const getExecutionMode = (): 'development' | 'dev-watch' | 'production' | 'test' => {
    if (isTestMode) return 'test';
    if (isProduction) return 'production';
    if (isDevelopmentWithNodemon) return 'dev-watch';
    if (isStartScript) return 'development';
    return 'development'; // fallback
};

// ===== CONFIGURACIÓN BASE COMÚN =====
const commonConfig: Partial<DataSourceOptions> = {
    type: "mysql",
    host: env.DB_HOST || 'localhost',
    port: parseInt(env.DB_PORT || '3306'),
    username: env.DB_USERNAME || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_DATABASE || 'vea_db',
    
    // Configuración de entidades
    entities: [
        // === ENTIDADES PRINCIPALES ===
        Users,
        RefreshToken,
        
        // === ENTIDADES DE USUARIOS ===
        Sellers,
        Buyers,
        
        // === ENTIDADES DE CONFIGURACIÓN ===
        Categories,
        ArticleStatus,
        PublishingStatus,
        SaleStatus,
        
        // === ENTIDADES GEOGRÁFICAS ===
        Departments,
        Municipalities,
        
        // === ENTIDADES DE PUBLICACIONES ===
        Publishing,
        PublishingCategories,
        PublishingDesc,
        PublishingImg,
        
        // === ENTIDADES DE VENTAS ===
        Sales,
        SaleDet,
        
        // === ENTIDADES DE INTERACCIÓN ===
        Reviews,
        Chat,
        Payload,
        
        // === ENTIDADES DE AUTENTICACIÓN AVANZADA ===
        UserRefreshToken,
        UserPasswordReset,
        UserLoginAttempt,
        UserSession
    ],
    
    migrations: ["src/core/migrations/*.ts"],
    subscribers: ["src/core/subscribers/*.ts"]
};

// ===== CONFIGURACIONES ESPECÍFICAS POR MODO =====

// Configuración para desarrollo con nodemon (npm run dev)
const devWatchConfig: DataSourceOptions = {
    ...commonConfig,
    synchronize: true,
    logging: ['query', 'error', 'warn', 'info'],
    cache: false,
    dropSchema: false,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    }
} as DataSourceOptions;

// Configuración para desarrollo estándar (npm run start)
const developmentConfig: DataSourceOptions = {
    ...commonConfig,
    synchronize: true,
    logging: ['error', 'warn'],
    cache: false,
    dropSchema: false,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    }
} as DataSourceOptions;

// Configuración para producción
const productionConfig: DataSourceOptions = {
    ...commonConfig,
    synchronize: false, // NUNCA en producción
    logging: ['error'],
    cache: false, // Simplificado por ahora
    extra: {
        charset: 'utf8mb4_unicode_ci',
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true,
        connectionLimit: 10,
    }
} as DataSourceOptions;

// Configuración para testing
const testConfig: DataSourceOptions = {
    ...commonConfig,
    database: env.DB_TEST_DATABASE || 'vea_db_test',
    synchronize: true,
    logging: false,
    dropSchema: true,
} as DataSourceOptions;

// ===== SELECCIÓN DE CONFIGURACIÓN =====
const getDataSourceConfig = (): DataSourceOptions => {
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
export const AppDataSource = new DataSource(getDataSourceConfig());

// ===== FUNCIONES AUXILIARES =====

/**
 * Inicializa la conexión a la base de datos
 * Detecta automáticamente el modo de ejecución
 */
export const initializeDatabase = async (): Promise<void> => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            const mode = getExecutionMode();
            console.log(`✅ Base de datos conectada correctamente`);
            console.log(`📊 Modo: ${mode}`);
            console.log(`🗄️  Database: ${AppDataSource.options.database}`);
            console.log(`🔄 Sincronización: ${AppDataSource.options.synchronize}`);
            console.log(`📝 Logging: ${Array.isArray(AppDataSource.options.logging) ? 
                AppDataSource.options.logging.join(', ') : 
                AppDataSource.options.logging}`);
        }
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        throw error;
    }
};

/**
 * Cierra la conexión a la base de datos
 */
export const closeDatabase = async (): Promise<void> => {
    try {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("🔌 Conexión a la base de datos cerrada");
        }
    } catch (error) {
        console.error("❌ Error al cerrar la conexión:", error);
        throw error;
    }
};

/**
 * Verifica el estado de la conexión
 */
export const checkDatabaseConnection = (): boolean => {
    return AppDataSource.isInitialized;
};

/**
 * Obtiene información sobre la configuración actual
 */
export const getDatabaseInfo = () => {
    const options = AppDataSource.options as any; // Type assertion para acceder a propiedades específicas de MySQL
    return {
        mode: getExecutionMode(),
        isInitialized: AppDataSource.isInitialized,
        database: options.database,
        synchronize: options.synchronize,
        logging: options.logging,
        host: options.host,
        port: options.port
    };
};

// ===== CONFIGURACIÓN POR DEFECTO =====
export default AppDataSource;