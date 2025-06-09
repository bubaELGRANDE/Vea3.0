"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../../../core/confi/env");
class TokenService {
    constructor() {
        // Usar valores por defecto para desarrollo si las variables no están disponibles
        const accessSecret = env_1.env.JWT_ACCESS_SECRET || 'veasecret-development';
        const refreshSecret = env_1.env.JWT_REFRESH_SECRET || 'topveasecret-development';
        if (!accessSecret || !refreshSecret) {
            throw new Error('JWT secrets are required in environment variables');
        }
        this.accessTokenSecret = accessSecret;
        this.refreshTokenSecret = refreshSecret;
        this.accessTokenExpiration = env_1.env.JWT_ACCESS_EXPIRATION_TIME || '1h';
        this.refreshTokenExpiration = env_1.env.JWT_REFRESH_EXPIRATION_TIME || '7d';
        // Log de advertencia en desarrollo si se usan valores por defecto
        if (!env_1.env.JWT_ACCESS_SECRET || !env_1.env.JWT_REFRESH_SECRET) {
            console.warn('⚠️  ADVERTENCIA: Usando secretos JWT por defecto. Configure JWT_ACCESS_SECRET y JWT_REFRESH_SECRET en .env');
        }
    }
    /**
     * Genera un par de tokens (access y refresh)
     */
    generateTokenPair(payload) {
        const accessTokenPayload = Object.assign(Object.assign({}, payload), { type: 'access' });
        const refreshTokenPayload = Object.assign(Object.assign({}, payload), { type: 'refresh' });
        const accessTokenOptions = {
            expiresIn: this.accessTokenExpiration,
            issuer: 'vea-api',
            audience: 'vea-client'
        };
        const refreshTokenOptions = {
            expiresIn: this.refreshTokenExpiration,
            issuer: 'vea-api',
            audience: 'vea-client'
        };
        const accessToken = jsonwebtoken_1.default.sign(accessTokenPayload, this.accessTokenSecret, accessTokenOptions);
        const refreshToken = jsonwebtoken_1.default.sign(refreshTokenPayload, this.refreshTokenSecret, refreshTokenOptions);
        return {
            accessToken,
            refreshToken,
            expiresIn: this.parseExpirationTime(this.accessTokenExpiration.toString()),
            refreshExpiresIn: this.parseExpirationTime(this.refreshTokenExpiration.toString())
        };
    } /**
     * Valida un access token
     */
    validateAccessToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.accessTokenSecret, {
                issuer: 'vea-api',
                audience: 'vea-client'
            });
            if (payload.type !== 'access') {
                return {
                    valid: false,
                    error: 'Invalid token type'
                };
            }
            return {
                valid: true,
                payload
            };
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return {
                    valid: false,
                    error: 'Token expired'
                };
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return {
                    valid: false,
                    error: 'Invalid token'
                };
            }
            else {
                return {
                    valid: false,
                    error: 'Token validation failed'
                };
            }
        }
    } /**
     * Valida un refresh token
     */
    validateRefreshToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.refreshTokenSecret, {
                issuer: 'vea-api',
                audience: 'vea-client'
            });
            if (payload.type !== 'refresh') {
                return {
                    valid: false,
                    error: 'Invalid token type'
                };
            }
            return {
                valid: true,
                payload
            };
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return {
                    valid: false,
                    error: 'Refresh token expired'
                };
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return {
                    valid: false,
                    error: 'Invalid refresh token'
                };
            }
            else {
                return {
                    valid: false,
                    error: 'Refresh token validation failed'
                };
            }
        }
    }
    /**
     * Genera un hash seguro para un token
     */
    generateTokenHash(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    }
    /**
     * Genera un token aleatorio seguro para reset de contraseña
     */
    generateSecureToken(length = 32) {
        return crypto_1.default.randomBytes(length).toString('hex');
    } /**
     * Extrae el payload de un token sin validarlo (para casos específicos)
     */
    decodeToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            return decoded;
        }
        catch (_a) {
            return null;
        }
    }
    /**
     * Convierte tiempo de expiración a segundos
     */
    parseExpirationTime(expiration) {
        const match = expiration.match(/^(\d+)([smhd])$/);
        if (!match) {
            throw new Error(`Invalid expiration format: ${expiration}`);
        }
        const value = parseInt(match[1]);
        const unit = match[2];
        switch (unit) {
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 60 * 60;
            case 'd':
                return value * 60 * 60 * 24;
            default:
                throw new Error(`Invalid time unit: ${unit}`);
        }
    } /**
     * Obtiene la fecha de expiración de un token
     */
    getTokenExpiration(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || !decoded.exp) {
            return null;
        }
        return new Date(decoded.exp * 1000);
    }
    /**
     * Verifica si un token está próximo a expirar
     */
    isTokenNearExpiration(token, thresholdMinutes = 15) {
        const expiration = this.getTokenExpiration(token);
        if (!expiration) {
            return true;
        }
        const now = new Date();
        const threshold = new Date(now.getTime() + (thresholdMinutes * 60 * 1000));
        return expiration <= threshold;
    }
}
exports.TokenService = TokenService;
