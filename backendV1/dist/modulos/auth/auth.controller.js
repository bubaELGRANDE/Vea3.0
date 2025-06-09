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
exports.AuthController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const auth_service_1 = require("./services/auth.service");
const user_service_1 = require("../usuarios/user.service");
const auth_types_1 = require("./auth.types");
const auth_dto_1 = require("./auth.dto");
class AuthController {
    constructor() {
        /**
         * Login de usuario
         */
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = (0, class_transformer_1.plainToClass)(auth_dto_1.LoginDto, req.body);
                const errors = yield (0, class_validator_1.validate)(loginDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
                const userAgent = req.headers['user-agent'];
                const authResponse = yield this.authService.login(loginDto, ipAddress, userAgent);
                res.status(200).json({
                    success: true,
                    data: authResponse
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Refresh token
         */
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshTokenDto = (0, class_transformer_1.plainToClass)(auth_dto_1.RefreshTokenDto, req.body);
                const errors = yield (0, class_validator_1.validate)(refreshTokenDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
                const userAgent = req.headers['user-agent'];
                const tokens = yield this.authService.refreshToken(refreshTokenDto, ipAddress, userAgent);
                res.status(200).json({
                    success: true,
                    data: tokens
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Logout
         */
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshTokenDto = (0, class_transformer_1.plainToClass)(auth_dto_1.RefreshTokenDto, req.body);
                const errors = yield (0, class_validator_1.validate)(refreshTokenDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Refresh token requerido'
                        }
                    });
                    return;
                }
                yield this.authService.logout(refreshTokenDto);
                res.status(200).json({
                    success: true,
                    message: 'Logout exitoso'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Revoca todos los tokens del usuario
         */
        this.revokeAllTokens = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: 'UNAUTHORIZED',
                            message: 'Usuario no autenticado'
                        }
                    });
                    return;
                }
                yield this.authService.revokeAllTokens(req.user.id);
                res.status(200).json({
                    success: true,
                    message: 'Todos los tokens han sido revocados exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Cambio de contraseña
         */
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: 'UNAUTHORIZED',
                            message: 'Usuario no autenticado'
                        }
                    });
                    return;
                }
                const changePasswordDto = (0, class_transformer_1.plainToClass)(auth_dto_1.ChangePasswordDto, req.body);
                const errors = yield (0, class_validator_1.validate)(changePasswordDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                yield this.authService.changePassword(req.user.id, changePasswordDto);
                res.status(200).json({
                    success: true,
                    message: 'Contraseña cambiada exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Registro de usuario
         */
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = (0, class_transformer_1.plainToClass)(auth_dto_1.CreateUserDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createUserDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                const user = yield this.authService.register(createUserDto);
                res.status(201).json({
                    success: true,
                    data: {
                        user,
                        message: 'Usuario registrado exitosamente'
                    }
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Solicitar reset de contraseña
         */
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const forgotPasswordDto = (0, class_transformer_1.plainToClass)(auth_dto_1.ForgotPasswordDto, req.body);
                const errors = yield (0, class_validator_1.validate)(forgotPasswordDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Email inválido'
                        }
                    });
                    return;
                }
                const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
                yield this.userService.forgotPassword(forgotPasswordDto, ipAddress);
                res.status(200).json({
                    success: true,
                    message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Resetear contraseña
         */
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resetPasswordDto = (0, class_transformer_1.plainToClass)(auth_dto_1.ResetPasswordDto, req.body);
                const errors = yield (0, class_validator_1.validate)(resetPasswordDto);
                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'Datos de entrada inválidos',
                            details: errors.map(error => ({
                                field: error.property,
                                errors: Object.values(error.constraints || {})
                            }))
                        }
                    });
                    return;
                }
                yield this.userService.resetPassword(resetPasswordDto);
                res.status(200).json({
                    success: true,
                    message: 'Contraseña restablecida exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Obtener perfil del usuario autenticado
         */
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: 'UNAUTHORIZED',
                            message: 'Usuario no autenticado'
                        }
                    });
                    return;
                }
                const user = yield this.userService.getUserById(req.user.id);
                if (!user) {
                    res.status(404).json({
                        success: false,
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'Usuario no encontrado'
                        }
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Obtener sesiones activas del usuario
         */
        this.getSessions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: 'UNAUTHORIZED',
                            message: 'Usuario no autenticado'
                        }
                    });
                    return;
                }
                const sessions = yield this.userService.getUserSessions(req.user.id);
                res.status(200).json({
                    success: true,
                    data: sessions
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        /**
         * Revocar una sesión específica
         */
        this.revokeSession = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        error: {
                            code: 'UNAUTHORIZED',
                            message: 'Usuario no autenticado'
                        }
                    });
                    return;
                }
                const { sessionId } = req.params;
                if (!sessionId) {
                    res.status(400).json({
                        success: false,
                        error: {
                            code: 'VALIDATION_ERROR',
                            message: 'ID de sesión requerido'
                        }
                    });
                    return;
                }
                yield this.userService.revokeSession(req.user.id, sessionId);
                res.status(200).json({
                    success: true,
                    message: 'Sesión revocada exitosamente'
                });
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
        this.authService = new auth_service_1.AuthService();
        this.userService = new user_service_1.UserService();
    }
    /**
     * Manejo centralizado de errores
     */
    handleError(error, res) {
        console.error('Error en AuthController:', error);
        if (error instanceof auth_types_1.AuthError) {
            res.status(error.statusCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message
                }
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Error interno del servidor'
                }
            });
        }
    }
}
exports.AuthController = AuthController;
