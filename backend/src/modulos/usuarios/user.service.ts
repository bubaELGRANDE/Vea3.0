import { Repository } from 'typeorm';
import { AppDataSource } from '../../core/confi/data-source';
import { Users } from '../../core/entity/Users';
import { UserPasswordReset, UserSession } from '../../core/entity/Auth';
import { 
    AuthError, 
    AuthErrorCodes,
    AuthenticatedUser 
} from '../auth/auth.types';
import {
    CreateUserDto,
    UpdateUserDto,
    UserResponseDto,
    ForgotPasswordDto,
    ResetPasswordDto
} from '../auth/auth.dto';
import { CryptoService } from '../auth/services/crypto.service';
import { TokenService } from '../auth/services/token.service';

export class UserService {
    private userRepository: Repository<Users>;
    private passwordResetRepository: Repository<UserPasswordReset>;
    private sessionRepository: Repository<UserSession>;
    private tokenService: TokenService;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
        this.passwordResetRepository = AppDataSource.getRepository(UserPasswordReset);
        this.sessionRepository = AppDataSource.getRepository(UserSession);
        this.tokenService = new TokenService();
    }

    /**
     * Obtiene un usuario por ID
     */
    async getUserById(id: number): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['sellers', 'buyers']
        });

        if (!user) {
            return null;
        }

        const roles = this.getUserRoles(user);
        return this.mapToUserResponse(user, roles);
    }

    /**
     * Obtiene un usuario por email
     */
    async getUserByEmail(email: string): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOne({
            where: { email: email.toLowerCase() },
            relations: ['sellers', 'buyers']
        });

        if (!user) {
            return null;
        }

        const roles = this.getUserRoles(user);
        return this.mapToUserResponse(user, roles);
    }

    /**
     * Obtiene un usuario por username
     */
    async getUserByUsername(username: string): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOne({
            where: { username: username.toLowerCase() },
            relations: ['sellers', 'buyers']
        });

        if (!user) {
            return null;
        }

        const roles = this.getUserRoles(user);
        return this.mapToUserResponse(user, roles);
    }

    /**
     * Obtiene todos los usuarios con paginación
     */
    async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<{
        users: UserResponseDto[];
        total: number;
        totalPages: number;
        currentPage: number;
    }> {
        const skip = (page - 1) * limit;
        const queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.sellers', 'sellers')
            .leftJoinAndSelect('user.buyers', 'buyers');

        if (search) {
            queryBuilder.where(
                'user.name ILIKE :search OR user.username ILIKE :search OR user.email ILIKE :search',
                { search: `%${search}%` }
            );
        }

        const [users, total] = await queryBuilder
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
    }

    /**
     * Actualiza un usuario
     */
    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['sellers', 'buyers']
        });

        if (!user) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
        }

        // Verificar email único si se está actualizando
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDto.email.toLowerCase() }
            });

            if (existingUser && existingUser.id !== id) {
                throw new AuthError(AuthErrorCodes.EMAIL_ALREADY_EXISTS, 'El email ya está en uso', 409);
            }
        }

        // Verificar username único si se está actualizando
        if (updateUserDto.username && updateUserDto.username !== user.username) {
            const existingUser = await this.userRepository.findOne({
                where: { username: updateUserDto.username.toLowerCase() }
            });

            if (existingUser && existingUser.id !== id) {
                throw new AuthError(AuthErrorCodes.USERNAME_ALREADY_EXISTS, 'El nombre de usuario ya está en uso', 409);
            }
        }

        // Actualizar campos
        if (updateUserDto.name) user.name = updateUserDto.name.trim();
        if (updateUserDto.username) user.username = updateUserDto.username.toLowerCase().trim();
        if (updateUserDto.email) user.email = updateUserDto.email.toLowerCase().trim();
        if (updateUserDto.img) user.img = updateUserDto.img;
        if (updateUserDto.isActive !== undefined) user.isActive = updateUserDto.isActive;

        const updatedUser = await this.userRepository.save(user);
        const roles = this.getUserRoles(updatedUser);
        return this.mapToUserResponse(updatedUser, roles);
    }

    /**
     * Desactiva un usuario
     */
    async deactivateUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
        }

        user.isActive = false;
        user.tokenVersion += 1; // Invalidar todos los tokens

        await this.userRepository.save(user);

        // Limpiar todas las sesiones activas
        await this.sessionRepository.update(
            { userId: id },
            { isActive: false }
        );
    }

    /**
     * Reactiva un usuario
     */
    async activateUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
        }

        user.isActive = true;
        await this.userRepository.save(user);
    }

    /**
     * Elimina un usuario (soft delete)
     */
    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
        }

        // En lugar de eliminar, desactivamos y marcamos como eliminado
        user.isActive = false;
        user.email = `deleted_${Date.now()}_${user.email}`;
        user.username = `deleted_${Date.now()}_${user.username}`;
        user.tokenVersion += 1;

        await this.userRepository.save(user);

        // Limpiar todas las sesiones activas
        await this.sessionRepository.update(
            { userId: id },
            { isActive: false }
        );
    }

    /**
     * Inicia el proceso de recuperación de contraseña
     */
    async forgotPassword(forgotPasswordDto: ForgotPasswordDto, ipAddress: string): Promise<void> {
        const { email } = forgotPasswordDto;

        const user = await this.userRepository.findOne({
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
        await this.passwordResetRepository.update(
            { email: email.toLowerCase(), isUsed: false },
            { isUsed: true }
        );

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

        await this.passwordResetRepository.save(passwordReset);

        // Aquí enviarías el email con el token de reset
        // await this.emailService.sendPasswordResetEmail(user.email, resetToken);
        
        console.log(`Token de reset para ${email}: ${resetToken}`); // Solo para desarrollo
    }

    /**
     * Resetea la contraseña usando el token
     */
    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { token, newPassword } = resetPasswordDto;

        const passwordReset = await this.passwordResetRepository.findOne({
            where: { 
                token,
                isUsed: false
            }
        });

        if (!passwordReset) {
            throw new AuthError(AuthErrorCodes.TOKEN_INVALID, 'Token de reset inválido o ya utilizado', 400);
        }

        if (passwordReset.expiresAt < new Date()) {
            throw new AuthError(AuthErrorCodes.TOKEN_EXPIRED, 'Token de reset expirado', 400);
        }

        const user = await this.userRepository.findOne({
            where: { email: passwordReset.email }
        });

        if (!user || !user.isActive) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado o inactivo', 404);
        }

        // Verificar que la nueva contraseña sea segura
        const passwordCheck = CryptoService.isPasswordSecure(newPassword);
        if (!passwordCheck.isSecure) {
            throw new AuthError(AuthErrorCodes.INVALID_PASSWORD, 'La nueva contraseña no cumple con los requisitos de seguridad', 400);
        }

        // Hashear nueva contraseña
        const hashedPassword = await CryptoService.hashPassword(newPassword);

        // Actualizar usuario
        user.password = hashedPassword;
        user.tokenVersion += 1; // Invalidar todos los tokens existentes
        await this.userRepository.save(user);

        // Marcar token como usado
        passwordReset.isUsed = true;
        await this.passwordResetRepository.save(passwordReset);

        // Limpiar todas las sesiones activas del usuario
        await this.sessionRepository.update(
            { userId: user.id },
            { isActive: false }
        );
    }

    /**
     * Obtiene las sesiones activas de un usuario
     */
    async getUserSessions(userId: number): Promise<any[]> {
        const sessions = await this.sessionRepository.find({
            where: { 
                userId,
                isActive: true,
                expiresAt: { $gt: new Date() } as any
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
    }

    /**
     * Revoca una sesión específica
     */
    async revokeSession(userId: number, sessionId: string): Promise<void> {
        const session = await this.sessionRepository.findOne({
            where: { 
                id: sessionId,
                userId
            }
        });

        if (session) {
            session.isActive = false;
            await this.sessionRepository.save(session);
        }
    }

    // Métodos privados auxiliares

    private getUserRoles(user: Users): string[] {
        const roles: string[] = ['buyer']; // Rol base

        if (user.sellers && user.sellers.length > 0) {
            roles.push('seller');
        }

        // Aquí se puede agregar lógica para roles de admin
        
        return roles;
    }

    private mapToUserResponse(user: Users, roles: string[]): UserResponseDto {
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
