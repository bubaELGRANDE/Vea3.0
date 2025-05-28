export const env = {
    PORT: process.env.PORT,
<<<<<<< HEAD
=======
    NODE_ENV: process.env.NODE_ENV,
>>>>>>> main
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME,
<<<<<<< HEAD
=======
    
    // Nuevas variables para el sistema de autenticación avanzado
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || '12',
    PASSWORD_PEPPER: process.env.PASSWORD_PEPPER || 'default-pepper-change-in-production',
    MAX_LOGIN_ATTEMPTS: process.env.MAX_LOGIN_ATTEMPTS || '5',
    LOGIN_ATTEMPT_WINDOW: process.env.LOGIN_ATTEMPT_WINDOW || '900000', // 15 minutos
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || '900000', // 15 minutos
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || '100',
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT || '7200000', // 2 horas
    PASSWORD_RESET_TOKEN_EXPIRY: process.env.PASSWORD_RESET_TOKEN_EXPIRY || '3600000', // 1 hora
>>>>>>> main
};