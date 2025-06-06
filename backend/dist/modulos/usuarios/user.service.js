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
exports.UserService = void 0;
const data_source_1 = require("../../core/confi/data-source");
const Users_1 = require("../../core/entity/Users");
const Auth_1 = require("../../core/entity/Auth");
const auth_types_1 = require("../auth/auth.types");
const crypto_service_1 = require("../auth/services/crypto.service");
const token_service_1 = require("../auth/services/token.service");
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
        this.passwordResetRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserPasswordReset);
        this.sessionRepository = data_source_1.AppDataSource.getRepository(Auth_1.UserSession);
        this.tokenService = new token_service_1.TokenService();
    }
    /**
     * Obtiene un usuario por ID
     */
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id },
                relations: ['sellers', 'buyers']
            });
            if (!user) {
                return null;
            }
            const roles = this.getUserRoles(user);
            return this.mapToUserResponse(user, roles);
        });
    }
    /**
     * Obtiene un usuario por email
     */
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email: email.toLowerCase() },
                relations: ['sellers', 'buyers']
            });
            if (!user) {
                return null;
            }
            const roles = this.getUserRoles(user);
            return this.mapToUserResponse(user, roles);
        });
    }
    /**
     * Obtiene un usuario por username
     */
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { username: username.toLowerCase() },
                relations: ['sellers', 'buyers']
            });
            if (!user) {
                return null;
            }
            const roles = this.getUserRoles(user);
            return this.mapToUserResponse(user, roles);
        });
    }
    /**
     * Obtiene todos los usuarios con paginación
     */
    getUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, search) {
            const skip = (page - 1) * limit;
            const queryBuilder = this.userRepository.createQueryBuilder('user')
                .leftJoinAndSelect('user.sellers', 'sellers')
                .leftJoinAndSelect('user.buyers', 'buyers');
            if (search) {
                queryBuilder.where('user.name ILIKE :search OR user.username ILIKE :search OR user.email ILIKE :search', { search: `%${search}%` });
            }
            const [users, total] = yield queryBuilder
                .skip(skip)
                .take(limit)
                .orderBy('user.createdAt', 'DESC')
                .getManyAndCount();
            const usersResponse = users.map(user => {
                const roles = this.getUserRoles(user);
                return this.mapToUserResponse(user, roles);
            });
            return {
                users: usersResponse,
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page
            };
        });
    }
    /**
     * Actualiza un usuario
     */
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id },
                relations: ['sellers', 'buyers']
            });
            if (!user) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
            }
            // Verificar email único si se está actualizando
            if (updateUserDto.email && updateUserDto.email !== user.email) {
                const existingUser = yield this.userRepository.findOne({
                    where: { email: updateUserDto.email.toLowerCase() }
                });
                if (existingUser && existingUser.id !== id) {
                    throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.EMAIL_ALREADY_EXISTS, 'El email ya está en uso', 409);
                }
            }
            // Verificar username único si se está actualizando
            if (updateUserDto.username && updateUserDto.username !== user.username) {
                const existingUser = yield this.userRepository.findOne({
                    where: { username: updateUserDto.username.toLowerCase() }
                });
                if (existingUser && existingUser.id !== id) {
                    throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USERNAME_ALREADY_EXISTS, 'El nombre de usuario ya está en uso', 409);
                }
            }
            // Actualizar campos
            if (updateUserDto.name)
                user.name = updateUserDto.name.trim();
            if (updateUserDto.username)
                user.username = updateUserDto.username.toLowerCase().trim();
            if (updateUserDto.email)
                user.email = updateUserDto.email.toLowerCase().trim();
            if (updateUserDto.img)
                user.img = updateUserDto.img;
            if (updateUserDto.isActive !== undefined)
                user.isActive = updateUserDto.isActive;
            const updatedUser = yield this.userRepository.save(user);
            const roles = this.getUserRoles(updatedUser);
            return this.mapToUserResponse(updatedUser, roles);
        });
    }
    /**
     * Desactiva un usuario
     */
    deactivateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
            }
            user.isActive = false;
            user.tokenVersion += 1; // Invalidar todos los tokens
            yield this.userRepository.save(user);
            // Limpiar todas las sesiones activas
            yield this.sessionRepository.update({ userId: id }, { isActive: false });
        });
    }
    /**
     * Reactiva un usuario
     */
    activateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
            }
            user.isActive = true;
            yield this.userRepository.save(user);
        });
    }
    /**
     * Elimina un usuario (soft delete)
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
            }
            // En lugar de eliminar, desactivamos y marcamos como eliminado
            user.isActive = false;
            user.email = `deleted_${Date.now()}_${user.email}`;
            user.username = `deleted_${Date.now()}_${user.username}`;
            user.tokenVersion += 1;
            yield this.userRepository.save(user);
            // Limpiar todas las sesiones activas
            yield this.sessionRepository.update({ userId: id }, { isActive: false });
        });
    }
    /**
     * Inicia el proceso de recuperación de contraseña
     */
    forgotPassword(forgotPasswordDto, ipAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = forgotPasswordDto;
            const user = yield this.userRepository.findOne({
                where: { email: email.toLowerCase() }
            });
            if (!user) {
                // Por seguridad, no revelamos si el email existe o no
                return;
            }
            if (!user.isActive) {
                return;
            }
            // Invalidar tokens de reset anteriores
            yield this.passwordResetRepository.update({ email: email.toLowerCase(), isUsed: false }, { isUsed: true });
            // Generar nuevo token de reset
            const resetToken = this.tokenService.generateSecureToken(32);
            const expiresAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hora
            const passwordReset = this.passwordResetRepository.create({
                email: email.toLowerCase(),
                token: resetToken,
                expiresAt,
                ipAddress,
                isUsed: false
            });
            yield this.passwordResetRepository.save(passwordReset);
            // Aquí enviarías el email con el token de reset
            // await this.emailService.sendPasswordResetEmail(user.email, resetToken);
            console.log(`Token de reset para ${email}: ${resetToken}`); // Solo para desarrollo
        });
    }
    /**
     * Resetea la contraseña usando el token
     */
    resetPassword(resetPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, newPassword } = resetPasswordDto;
            const passwordReset = yield this.passwordResetRepository.findOne({
                where: {
                    token,
                    isUsed: false
                }
            });
            if (!passwordReset) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_INVALID, 'Token de reset inválido o ya utilizado', 400);
            }
            if (passwordReset.expiresAt < new Date()) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.TOKEN_EXPIRED, 'Token de reset expirado', 400);
            }
            const user = yield this.userRepository.findOne({
                where: { email: passwordReset.email }
            });
            if (!user || !user.isActive) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado o inactivo', 404);
            }
            // Verificar que la nueva contraseña sea segura
            const passwordCheck = crypto_service_1.CryptoService.isPasswordSecure(newPassword);
            if (!passwordCheck.isSecure) {
                throw new auth_types_1.AuthError(auth_types_1.AuthErrorCodes.INVALID_PASSWORD, 'La nueva contraseña no cumple con los requisitos de seguridad', 400);
            }
            // Hashear nueva contraseña
            const hashedPassword = yield crypto_service_1.CryptoService.hashPassword(newPassword);
            // Actualizar usuario
            user.password = hashedPassword;
            user.tokenVersion += 1; // Invalidar todos los tokens existentes
            yield this.userRepository.save(user);
            // Marcar token como usado
            passwordReset.isUsed = true;
            yield this.passwordResetRepository.save(passwordReset);
            // Limpiar todas las sesiones activas del usuario
            yield this.sessionRepository.update({ userId: user.id }, { isActive: false });
        });
    }
    /**
     * Obtiene las sesiones activas de un usuario
     */
    getUserSessions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = yield this.sessionRepository.find({
                where: {
                    userId,
                    isActive: true,
                    expiresAt: { $gt: new Date() }
                },
                order: { lastActivityAt: 'DESC' }
            });
            return sessions.map(session => ({
                id: session.id,
                deviceInfo: session.deviceInfo,
                ipAddress: session.ipAddress,
                lastActivity: session.lastActivityAt,
                createdAt: session.createdAt
            }));
        });
    }
    /**
     * Revoca una sesión específica
     */
    revokeSession(userId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.sessionRepository.findOne({
                where: {
                    id: sessionId,
                    userId
                }
            });
            if (session) {
                session.isActive = false;
                yield this.sessionRepository.save(session);
            }
        });
    }
    // Métodos privados auxiliares
    getUserRoles(user) {
        const roles = ['buyer']; // Rol base
        if (user.sellers && user.sellers.length > 0) {
            roles.push('seller');
        }
        // Aquí se puede agregar lógica para roles de admin
        return roles;
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
exports.UserService = UserService;
