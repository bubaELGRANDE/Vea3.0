import jwt, { SignOptions, JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../../../core/confi/env';
import { JwtPayload, TokenPair, TokenValidationResult } from '../auth.types';

export class TokenService {
    private readonly accessTokenSecret: string;
    private readonly refreshTokenSecret: string;
    private readonly accessTokenExpiration: string | number;
    private readonly refreshTokenExpiration: string | number;    constructor() {
        // Usar valores por defecto para desarrollo si las variables no están disponibles
        const accessSecret = env.JWT_ACCESS_SECRET || 'veasecret-development';
        const refreshSecret = env.JWT_REFRESH_SECRET || 'topveasecret-development';
        
        if (!accessSecret || !refreshSecret) {
            throw new Error('JWT secrets are required in environment variables');
        }

        this.accessTokenSecret = accessSecret;
        this.refreshTokenSecret = refreshSecret;
        this.accessTokenExpiration = env.JWT_ACCESS_EXPIRATION_TIME || '1h';
        this.refreshTokenExpiration = env.JWT_REFRESH_EXPIRATION_TIME || '7d';
        
        // Log de advertencia en desarrollo si se usan valores por defecto
        if (!env.JWT_ACCESS_SECRET || !env.JWT_REFRESH_SECRET) {
            console.warn('⚠️  ADVERTENCIA: Usando secretos JWT por defecto. Configure JWT_ACCESS_SECRET y JWT_REFRESH_SECRET en .env');
        }
    }

    /**
     * Genera un par de tokens (access y refresh)
     */
    generateTokenPair(payload: Omit<JwtPayload, 'type'>): TokenPair {
        const accessTokenPayload: JwtPayload = {
            ...payload,
            type: 'access'
        };

        const refreshTokenPayload: JwtPayload = {
            ...payload,
            type: 'refresh'
        };        const accessTokenOptions: SignOptions = {
            expiresIn: this.accessTokenExpiration as any,
            issuer: 'vea-api',
            audience: 'vea-client'
        };

        const refreshTokenOptions: SignOptions = {
            expiresIn: this.refreshTokenExpiration as any,
            issuer: 'vea-api',
            audience: 'vea-client'
        };

        const accessToken = jwt.sign(accessTokenPayload, this.accessTokenSecret, accessTokenOptions);
        const refreshToken = jwt.sign(refreshTokenPayload, this.refreshTokenSecret, refreshTokenOptions);        return {
            accessToken,
            refreshToken,
            expiresIn: this.parseExpirationTime(this.accessTokenExpiration.toString()),
            refreshExpiresIn: this.parseExpirationTime(this.refreshTokenExpiration.toString())
        };
    }    /**
     * Valida un access token
     */
    validateAccessToken(token: string): TokenValidationResult {
        try {
            const payload = jwt.verify(token, this.accessTokenSecret, {
                issuer: 'vea-api',
                audience: 'vea-client'
            }) as unknown as JwtPayload;

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
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    valid: false,
                    error: 'Token expired'
                };
            } else if (error instanceof jwt.JsonWebTokenError) {
                return {
                    valid: false,
                    error: 'Invalid token'
                };
            } else {
                return {
                    valid: false,
                    error: 'Token validation failed'
                };
            }
        }
    }    /**
     * Valida un refresh token
     */
    validateRefreshToken(token: string): TokenValidationResult {
        try {
            const payload = jwt.verify(token, this.refreshTokenSecret, {
                issuer: 'vea-api',
                audience: 'vea-client'
            }) as unknown as JwtPayload;

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
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    valid: false,
                    error: 'Refresh token expired'
                };
            } else if (error instanceof jwt.JsonWebTokenError) {
                return {
                    valid: false,
                    error: 'Invalid refresh token'
                };
            } else {
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
    generateTokenHash(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    /**
     * Genera un token aleatorio seguro para reset de contraseña
     */
    generateSecureToken(length: number = 32): string {
        return crypto.randomBytes(length).toString('hex');
    }    /**
     * Extrae el payload de un token sin validarlo (para casos específicos)
     */
    decodeToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.decode(token) as unknown as JwtPayload;
            return decoded;
        } catch {
            return null;
        }
    }

    /**
     * Convierte tiempo de expiración a segundos
     */
    private parseExpirationTime(expiration: string): number {
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
    }    /**
     * Obtiene la fecha de expiración de un token
     */
    getTokenExpiration(token: string): Date | null {
        const decoded = jwt.decode(token) as BaseJwtPayload;
        if (!decoded || !decoded.exp) {
            return null;
        }
        return new Date(decoded.exp * 1000);
    }

    /**
     * Verifica si un token está próximo a expirar
     */
    isTokenNearExpiration(token: string, thresholdMinutes: number = 15): boolean {
        const expiration = this.getTokenExpiration(token);
        if (!expiration) {
            return true;
        }

        const now = new Date();
        const threshold = new Date(now.getTime() + (thresholdMinutes * 60 * 1000));
        
        return expiration <= threshold;
    }
}
