import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../modulos/auth/services/auth.service';
import { TokenService } from '../../modulos/auth/services/token.service';
import { AuthError, AuthErrorCodes } from '../../modulos/auth/auth.types';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        username: string;
        roles: string[];
        tokenVersion: number;
    };
}

export class AuthMiddleware {
    private tokenService: TokenService | null = null;
    private authService: AuthService | null = null;

    private getTokenService(): TokenService {
        if (!this.tokenService) {
            this.tokenService = new TokenService();
        }
        return this.tokenService;
    }

    private getAuthService(): AuthService {
        if (!this.authService) {
            this.authService = new AuthService();
        }
        return this.authService;
    }

    /**
     * Middleware para verificar el token de acceso
     */
    authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.UNAUTHORIZED,
                        message: 'Token de acceso requerido'
                    }
                });
                return;
            }

            const token = authHeader.substring(7);
            const validation = this.getTokenService().validateAccessToken(token);

            if (!validation.valid || !validation.payload) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.TOKEN_INVALID,
                        message: 'Token inválido'
                    }
                });
                return;
            }

            const payload = validation.payload;

            // Verificar que el usuario exista y esté activo
            const userRepository = require('../../../core/confi/data-source').AppDataSource.getRepository(require('../../../core/entity/Users').Users);
            const user = await userRepository.findOne({
                where: { id: payload.sub },
                select: ['id', 'email', 'username', 'isActive', 'tokenVersion']
            });

            if (!user) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.USER_NOT_FOUND,
                        message: 'Usuario no encontrado'
                    }
                });
                return;
            }

            if (!user.isActive) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.ACCOUNT_INACTIVE,
                        message: 'Cuenta inactiva'
                    }
                });
                return;
            }

            if (payload.tokenVersion !== user.tokenVersion) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.TOKEN_REVOKED,
                        message: 'Token revocado'
                    }
                });
                return;
            }

            // Agregar información del usuario al request
            req.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                roles: payload.roles,
                tokenVersion: user.tokenVersion
            };

            next();
        } catch (error) {
            console.error('Error en middleware de autenticación:', error);
            res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Error interno del servidor'
                }
            });
        }
    };

    /**
     * Middleware para verificar roles específicos
     */
    authorize = (allowedRoles: string[]) => {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.UNAUTHORIZED,
                        message: 'Usuario no autenticado'
                    }
                });
                return;
            }

            const userRoles = req.user.roles || [];
            const hasPermission = allowedRoles.some(role => userRoles.includes(role));

            if (!hasPermission) {
                res.status(403).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.FORBIDDEN,
                        message: 'Sin permisos suficientes'
                    }
                });
                return;
            }

            next();
        };
    };

    /**
     * Middleware opcional - no falla si no hay token
     */
    optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                next();
                return;
            }            const token = authHeader.substring(7);
            const validation = this.getTokenService().validateAccessToken(token);

            if (validation.valid && validation.payload) {
                const payload = validation.payload;

                // Verificar usuario
                const userRepository = require('../../../core/confi/data-source').AppDataSource.getRepository(require('../../../core/entity/Users').Users);
                const user = await userRepository.findOne({
                    where: { id: payload.sub },
                    select: ['id', 'email', 'username', 'isActive', 'tokenVersion']
                });

                if (user && user.isActive && payload.tokenVersion === user.tokenVersion) {
                    req.user = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        roles: payload.roles,
                        tokenVersion: user.tokenVersion
                    };
                }
            }

            next();
        } catch (error) {
            // En caso de error, continúa sin autenticar
            next();
        }
    };

    /**
     * Middleware para verificar si el usuario es propietario del recurso
     */
    checkOwnership = (userIdField: string = 'userId') => {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.UNAUTHORIZED,
                        message: 'Usuario no autenticado'
                    }
                });
                return;
            }

            // Verificar si es admin
            if (req.user.roles.includes('admin')) {
                next();
                return;
            }

            // Verificar ownership
            const resourceUserId = req.params[userIdField] || req.body[userIdField];
            
            if (!resourceUserId || parseInt(resourceUserId) !== req.user.id) {
                res.status(403).json({
                    success: false,
                    error: {
                        code: AuthErrorCodes.FORBIDDEN,
                        message: 'No tienes permisos para acceder a este recurso'
                    }
                });
                return;
            }

            next();
        };
    };

    /**
     * Middleware para rate limiting básico
     */
    rateLimit = (maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) => {
        const requests = new Map();

        return (req: Request, res: Response, next: NextFunction): void => {
            const key = req.ip;
            const now = Date.now();
            const windowStart = now - windowMs;

            if (!requests.has(key)) {
                requests.set(key, []);
            }

            const userRequests = requests.get(key);
            
            // Limpiar requests antiguos
            const validRequests = userRequests.filter((timestamp: number) => timestamp > windowStart);
            requests.set(key, validRequests);

            if (validRequests.length >= maxRequests) {
                res.status(429).json({
                    success: false,
                    error: {
                        code: 'RATE_LIMIT_EXCEEDED',
                        message: 'Demasiadas solicitudes. Intenta de nuevo más tarde.'
                    }
                });
                return;
            }

            validRequests.push(now);
            requests.set(key, validRequests);

            next();
        };
    };
}

// Instancia única del middleware
export const authMiddleware = new AuthMiddleware();
