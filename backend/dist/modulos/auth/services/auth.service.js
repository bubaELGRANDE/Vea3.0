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
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../../../core/confi/data-source");
const Users_1 = require("../../../core/entity/Users");
const Auth_1 = require("../../../core/entity/Auth");
const auth_types_1 = require("../auth.types");
const token_service_1 = require("./token.service");
const crypto_service_1 = require("./crypto.service");
class AuthService {
    constructor() {
        // Configuración de seguridad
        this.MAX_LOGIN_ATTEMPTS = 5;
        this.LOCKOUT_DURATION_MINUTES = 1; // cambiar a 30 minutos en producción
        this.PASSWORD_RESET_EXPIRY_HOURS = 1;
        this.MAX_REFRESH_TOKENS_PER_USER = 5;
        this.userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
        this.refreshTokenRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserRefreshToken);
        this.passwordResetRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserPasswordReset);
        this.loginAttemptRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserLoginAttempt);
        this.sessionRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserSession);
        this.tokenService = new token_service_1.TokenService();
    }
    /**
     * Autentica un usuario y retorna tokens
     */
    login(loginDto, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, rememberMe } = loginDto;
            // Verificar intentos de login fallidos
            yield this.checkLoginAttempts(email, ipAddress);
            // Buscar usuario por email
            const user = yield this.userRepository.findOne({
                where: { email: email.toLowerCase() },
                select: ['id', 'name', 'username', 'email', 'password', 'img', 'isActive', 'tokenVersion', 'createdAt']
            });
            if (!user) {
                yield this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Usuario no encontrado');
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_CREDENTIALS, 'Credenciales inválidas', 401);
            }
            // Verificar que la cuenta esté activa
            if (!user.isActive) {
                yield this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Cuenta inactiva');
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.ACCOUNT_INACTIVE, 'Cuenta inactiva', 401);
            }
            // Verificar contraseña
            const isPasswordValid = yield crypto_service_1.CryptoService.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                yield this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Contraseña incorrecta');
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_CREDENTIALS, 'Credenciales inválidas', 401);
            }
            // Login exitoso
            yield this.recordLoginAttempt(email, ipAddress, userAgent, true);
            // Actualizar último login
            user.lastLoginAt = new Date();
            yield this.userRepository.save(user);
            // Determinar roles del usuario
            const roles = yield this.getUserRoles(user.id);
            // Generar tokens
            const tokenPayload = {
                sub: user.id,
                email: user.email,
                username: user.username,
                roles,
                tokenVersion: user.tokenVersion
            };
            const tokens = this.tokenService.generateTokenPair(tokenPayload);
            // Guardar refresh token
            yield this.saveRefreshToken(user.id, tokens.refreshToken, rememberMe ? '30d' : '7d', ipAddress, userAgent);
            // Limpiar tokens antiguos si es necesario
            yield this.cleanupOldRefreshTokens(user.id);
            return {
                user: this.mapToUserResponse(user, roles),
                tokens: {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                    expiresIn: tokens.expiresIn,
                    refreshExpiresIn: tokens.refreshExpiresIn,
                    tokenType: 'Bearer'
                },
                message: 'Login exitoso'
            };
        });
    }
    /**
     * Refresca los tokens de acceso
     */
    refreshToken(refreshTokenDto, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = refreshTokenDto;
            // Validar refresh token
            const validation = this.tokenService.validateRefreshToken(refreshToken);
            if (!validation.valid || !validation.payload) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_INVALID, 'Refresh token inválido', 401);
            }
            const payload = validation.payload;
            // Buscar token en la base de datos
            const tokenHash = this.tokenService.generateTokenHash(refreshToken);
            const storedToken = yield this.refreshTokenRepository.findOne({
                where: {
                    tokenHash,
                    userId: payload.sub,
                    isActive: true
                },
                relations: ['user']
            });
            if (!storedToken) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_REVOKED, 'Refresh token revocado', 401);
            }
            // Verificar expiración
            if (storedToken.expiresAt < new Date()) {
                yield this.refreshTokenRepository.remove(storedToken);
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_EXPIRED, 'Refresh token expirado', 401);
            }
            const user = storedToken.user;
            // Verificar que el usuario esté activo
            if (!user.isActive) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.ACCOUNT_INACTIVE, 'Cuenta inactiva', 401);
            }
            // Verificar token version
            if (payload.tokenVersion !== user.tokenVersion) {
                yield this.refreshTokenRepository.remove(storedToken);
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_REVOKED, 'Token revocado', 401);
            }
            // Determinar roles del usuario
            const roles = yield this.getUserRoles(user.id);
            // Generar nuevos tokens
            const newTokenPayload = {
                sub: user.id,
                email: user.email,
                username: user.username,
                roles,
                tokenVersion: user.tokenVersion
            };
            const newTokens = this.tokenService.generateTokenPair(newTokenPayload);
            // Actualizar refresh token
            storedToken.tokenHash = this.tokenService.generateTokenHash(newTokens.refreshToken);
            storedToken.lastUsedAt = new Date();
            storedToken.expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 días
            yield this.refreshTokenRepository.save(storedToken);
            return {
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
                expiresIn: newTokens.expiresIn,
                refreshExpiresIn: newTokens.refreshExpiresIn,
                tokenType: 'Bearer'
            };
        });
    }
    /**
     * Cierra sesión del usuario
     */
    logout(refreshTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = refreshTokenDto;
            const tokenHash = this.tokenService.generateTokenHash(refreshToken);
            const storedToken = yield this.refreshTokenRepository.findOne({
                where: { tokenHash }
            });
            if (storedToken) {
                yield this.refreshTokenRepository.remove(storedToken);
            }
        });
    }
    /**
     * Revoca todos los tokens de un usuario
     */
    revokeAllTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Incrementar token version
            yield this.userRepository.update(userId, {
                tokenVersion: () => 'token_version + 1'
            });
            // Eliminar todos los refresh tokens
            yield this.refreshTokenRepository.delete({ userId });
            // Desactivar todas las sesiones
            yield this.sessionRepository.update({ userId }, { isActive: false });
        });
    }
    /**
     * Cambia la contraseña del usuario
     */
    changePassword(userId, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword } = changePasswordDto;
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                select: ['id', 'password', 'tokenVersion']
            });
            if (!user) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
            }
            // Verificar contraseña actual
            const isCurrentPasswordValid = yield crypto_service_1.CryptoService.verifyPassword(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_PASSWORD, 'Contraseña actual incorrecta', 400);
            }
            // Verificar que la nueva contraseña sea segura
            const passwordCheck = crypto_service_1.CryptoService.isPasswordSecure(newPassword);
            if (!passwordCheck.isSecure) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_PASSWORD, 'La nueva contraseña no cumple con los requisitos de seguridad', 400);
            }
            // Hashear nueva contraseña
            const hashedPassword = yield crypto_service_1.CryptoService.hashPassword(newPassword);
            // Actualizar contraseña y token version
            yield this.userRepository.update(userId, {
                password: hashedPassword,
                tokenVersion: user.tokenVersion + 1
            });
            // Revocar todos los tokens existentes
            yield this.refreshTokenRepository.delete({ userId });
        });
    }
    /**
     * Registra un nuevo usuario
     */
    register(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, name, img, role } = createUserDto;
            // Verificar que el email no exista
            const existingUserByEmail = yield this.userRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            if (existingUserByEmail) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.EMAIL_ALREADY_EXISTS, 'El email ya está registrado', 409);
            }
            // Verificar que el username no exista
            const existingUserByUsername = yield this.userRepository.findOne({
                where: { username: username.toLowerCase() }
            });
            if (existingUserByUsername) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USERNAME_ALREADY_EXISTS, 'El nombre de usuario ya está en uso', 409);
            }
            // Verificar seguridad de la contraseña
            const passwordCheck = crypto_service_1.CryptoService.isPasswordSecure(password);
            if (!passwordCheck.isSecure) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_PASSWORD, 'La contraseña no cumple con los requisitos de seguridad', 400);
            }
            // Hashear contraseña
            const hashedPassword = yield crypto_service_1.CryptoService.hashPassword(password);
            // Crear usuario
            const user = this.userRepository.create({
                name: name.trim(),
                username: username.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                img: img || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
                isActive: true,
                tokenVersion: 0
            });
            const savedUser = yield this.userRepository.save(user);
            // Crear registro de role si se especifica
            if (role && role !== 'buyer') {
                yield this.assignUserRole(savedUser.id, role);
            }
            const roles = yield this.getUserRoles(savedUser.id);
            return this.mapToUserResponse(savedUser, roles);
        });
    }
    // Métodos privados auxiliares
    checkLoginAttempts(email, ipAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const since = new Date(Date.now() - (this.LOCKOUT_DURATION_MINUTES * 60 * 1000));
            const attemptCount = yield this.loginAttemptRepository.count({
                where: {
                    email: email.toLowerCase(),
                    ipAddress,
                    isSuccessful: false,
                    createdAt: (0, typeorm_1.MoreThanOrEqual)(since)
                }
            });
            if (attemptCount >= this.MAX_LOGIN_ATTEMPTS) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.ACCOUNT_LOCKED, 'Cuenta temporalmente bloqueada por múltiples intentos fallidos', 429);
            }
        });
    }
    recordLoginAttempt(email_1, ipAddress_1, userAgent_1) {
        return __awaiter(this, arguments, void 0, function* (email, ipAddress, userAgent, isSuccessful = false, failureReason) {
            const attempt = this.loginAttemptRepository.create({
                email: email.toLowerCase(),
                ipAddress,
                userAgent,
                isSuccessful,
                failureReason
            });
            yield this.loginAttemptRepository.save(attempt);
        });
    }
    saveRefreshToken(userId, refreshToken, duration, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenHash = this.tokenService.generateTokenHash(refreshToken);
            const expiresAt = new Date();
            // Calcular expiración basada en duración
            const durationMs = duration === '30d' ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
            expiresAt.setTime(expiresAt.getTime() + durationMs);
            const tokenEntity = this.refreshTokenRepository.create({
                userId,
                tokenHash,
                expiresAt,
                ipAddress,
                userAgent,
                isActive: true
            });
            yield this.refreshTokenRepository.save(tokenEntity);
        });
    }
    cleanupOldRefreshTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenCount = yield this.refreshTokenRepository.count({
                where: { userId, isActive: true }
            });
            if (tokenCount > this.MAX_REFRESH_TOKENS_PER_USER) {
                const oldTokens = yield this.refreshTokenRepository.find({
                    where: { userId, isActive: true },
                    order: { createdAt: 'ASC' },
                    take: tokenCount - this.MAX_REFRESH_TOKENS_PER_USER
                });
                yield this.refreshTokenRepository.remove(oldTokens);
            } // Limpiar tokens expirados
            yield this.refreshTokenRepository.delete({
                userId,
                expiresAt: (0, typeorm_1.LessThan)(new Date())
            });
        });
    }
    getUserRoles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Por ahora, implementación básica basada en las relaciones existentes
            const user = yield this.userRepository.findOne({
                where: { id: userId },
                relations: ['sellers', 'buyers']
            });
            if (!user)
                return ['buyer'];
            const roles = ['buyer']; // Rol base
            if (user.sellers && user.sellers.length > 0) {
                roles.push('seller');
            }
            // Aquí podrías agregar lógica para admin basado en algún campo
            return roles;
        });
    }
    assignUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implementar lógica para asignar roles específicos
            // Por ejemplo, crear registro en tabla de sellers si el role es 'seller'
            if (role === 'seller') {
                // Esto requeriría crear el registro en la tabla sellers
                // Se puede implementar cuando se integre con el módulo de sellers
            }
        });
    }
    mapToUserResponse(user, roles) {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            img: user.img,
            roles,
            isActive: user.isActive,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt
        };
    }
}
exports.AuthService = AuthService;
