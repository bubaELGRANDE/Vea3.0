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
exports.authMiddleware = exports.AuthMiddleware = void 0;
const auth_service_1 = require("../../modulos/auth/services/auth.service");
const token_service_1 = require("../../modulos/auth/services/token.service");
const auth_types_1 = require("../../modulos/auth/auth.types");
class AuthMiddleware {
    constructor() {
        this.tokenService = null;
        this.authService = null;
        /**
         * Middleware para verificar el token de acceso
         */
        this.authenticate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.UNAUTHORIZED,
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
                            code: auth_types_1.AuthErrorCodes.TOKEN_INVALID,
                            message: 'Token inválido'
                        }
                    });
                    return;
                }
                const payload = validation.payload;
                // Verificar que el usuario exista y esté activo
                const userRepository = require('../../../core/confi/data-source').AppDataSource.getRepository(require('../../../core/entity/Users').Users);
                const user = yield userRepository.findOne({
                    where: { id: payload.sub },
                    select: ['id', 'email', 'username', 'isActive', 'tokenVersion']
                });
                if (!user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.USER_NOT_FOUND,
                            message: 'Usuario no encontrado'
                        }
                    });
                    return;
                }
                if (!user.isActive) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.ACCOUNT_INACTIVE,
                            message: 'Cuenta inactiva'
                        }
                    });
                    return;
                }
                if (payload.tokenVersion !== user.tokenVersion) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.TOKEN_REVOKED,
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
            }
            catch (error) {
                console.error('Error en middleware de autenticación:', error);
                res.status(500).json({
                    success: false,
                    error: {
                        code: 'INTERNAL_ERROR',
                        message: 'Error interno del servidor'
                    }
                });
            }
        });
        /**
         * Middleware para verificar roles específicos
         */
        this.authorize = (allowedRoles) => {
            return (req, res, next) => {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.UNAUTHORIZED,
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
                            code: auth_types_1.AuthErrorCodes.FORBIDDEN,
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
        this.optionalAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    next();
                    return;
                }
                const token = authHeader.substring(7);
                const validation = this.getTokenService().validateAccessToken(token);
                if (validation.valid && validation.payload) {
                    const payload = validation.payload;
                    // Verificar usuario
                    const userRepository = require('../../../core/confi/data-source').AppDataSource.getRepository(require('../../../core/entity/Users').Users);
                    const user = yield userRepository.findOne({
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
            }
            catch (error) {
                // En caso de error, continúa sin autenticar
                next();
            }
        });
        /**
         * Middleware para verificar si el usuario es propietario del recurso
         */
        this.checkOwnership = (userIdField = 'userId') => {
            return (req, res, next) => {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: auth_types_1.AuthErrorCodes.UNAUTHORIZED,
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
                            code: auth_types_1.AuthErrorCodes.FORBIDDEN,
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
        this.rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
            const requests = new Map();
            return (req, res, next) => {
                const key = req.ip;
                const now = Date.now();
                const windowStart = now - windowMs;
                if (!requests.has(key)) {
                    requests.set(key, []);
                }
                const userRequests = requests.get(key);
                // Limpiar requests antiguos
                const validRequests = userRequests.filter((timestamp) => timestamp > windowStart);
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
    getTokenService() {
        if (!this.tokenService) {
            this.tokenService = new token_service_1.TokenService();
        }
        return this.tokenService;
    }
    getAuthService() {
        if (!this.authService) {
            this.authService = new auth_service_1.AuthService();
        }
        return this.authService;
    }
}
exports.AuthMiddleware = AuthMiddleware;
// Instancia única del middleware
exports.authMiddleware = new AuthMiddleware();
