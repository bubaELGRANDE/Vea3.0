import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { AppDataSource } from '../../../core/confi/data-source';
import { Users } from '../../../core/entity/Users';
import { 
    UserRefreshToken, 
    UserPasswordReset, 
    UserLoginAttempt, 
    UserSession 
} from '../../../core/entity/Auth';
import { 
    LoginCredentials,
    TokenPair,
    AuthenticatedUser,
    AuthError,
    AuthErrorCodes,
    JwtPayload
} from '../auth.types';
import {
    LoginDto,
    RefreshTokenDto,
    ChangePasswordDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    CreateUserDto,
    TokenResponseDto,
    AuthResponseDto,
    UserResponseDto
} from '../auth.dto';
import { TokenService } from './token.service';
import { CryptoService } from './crypto.service';

export class AuthService {
    private userRepository: Repository<Users>;
    private refreshTokenRepository: Repository<UserRefreshToken>;
    private passwordResetRepository: Repository<UserPasswordReset>;
    private loginAttemptRepository: Repository<UserLoginAttempt>;
    private sessionRepository: Repository<UserSession>;
    private tokenService: TokenService;

    // Configuración de seguridad
    private readonly MAX_LOGIN_ATTEMPTS = 5;
    private readonly LOCKOUT_DURATION_MINUTES = 1; // cambiar a 30 minutos en producción
    private readonly PASSWORD_RESET_EXPIRY_HOURS = 1;
    private readonly MAX_REFRESH_TOKENS_PER_USER = 5;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
        this.refreshTokenRepository = AppDataSource.getRepository(UserRefreshToken);
        this.passwordResetRepository = AppDataSource.getRepository(UserPasswordReset);
        this.loginAttemptRepository = AppDataSource.getRepository(UserLoginAttempt);
        this.sessionRepository = AppDataSource.getRepository(UserSession);
        this.tokenService = new TokenService();
    }

    /**
     * Autentica un usuario y retorna tokens
     */
    async login(loginDto: LoginDto, ipAddress: string, userAgent?: string): Promise<AuthResponseDto> {
        const { email, password, rememberMe } = loginDto;

        // Verificar intentos de login fallidos
        await this.checkLoginAttempts(email, ipAddress);

        // Buscar usuario por email
        const user = await this.userRepository.findOne({ 
            where: { email: email.toLowerCase() },
            select: ['id', 'name', 'username', 'email', 'password', 'img', 'isActive', 'tokenVersion', 'createdAt']
        });

        if (!user) {
            await this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Usuario no encontrado');
            throw new AuthError(AuthErrorCodes.INVALID_CREDENTIALS, 'Credenciales inválidas', 401);
        }

        // Verificar que la cuenta esté activa
        if (!user.isActive) {
            await this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Cuenta inactiva');
            throw new AuthError(AuthErrorCodes.ACCOUNT_INACTIVE, 'Cuenta inactiva', 401);
        }

        // Verificar contraseña
        const isPasswordValid = await CryptoService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            await this.recordLoginAttempt(email, ipAddress, userAgent, false, 'Contraseña incorrecta');
            throw new AuthError(AuthErrorCodes.INVALID_CREDENTIALS, 'Credenciales inválidas', 401);
        }

        // Login exitoso
        await this.recordLoginAttempt(email, ipAddress, userAgent, true);

        // Actualizar último login
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);

        // Determinar roles del usuario
        const roles = await this.getUserRoles(user.id);

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
        await this.saveRefreshToken(
            user.id, 
            tokens.refreshToken, 
            rememberMe ? '30d' : '7d',
            ipAddress,
            userAgent
        );

        // Limpiar tokens antiguos si es necesario
        await this.cleanupOldRefreshTokens(user.id);

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
    }

    /**
     * Refresca los tokens de acceso
     */
    async refreshToken(refreshTokenDto: RefreshTokenDto, ipAddress: string, userAgent?: string): Promise<TokenResponseDto> {
        const { refreshToken } = refreshTokenDto;

        // Validar refresh token
        const validation = this.tokenService.validateRefreshToken(refreshToken);
        if (!validation.valid || !validation.payload) {
            throw new AuthError(AuthErrorCodes.TOKEN_INVALID, 'Refresh token inválido', 401);
        }

        const payload = validation.payload;

        // Buscar token en la base de datos
        const tokenHash = this.tokenService.generateTokenHash(refreshToken);
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { 
                tokenHash,
                userId: payload.sub,
                isActive: true
            },
            relations: ['user']
        });

        if (!storedToken) {
            throw new AuthError(AuthErrorCodes.TOKEN_REVOKED, 'Refresh token revocado', 401);
        }

        // Verificar expiración
        if (storedToken.expiresAt < new Date()) {
            await this.refreshTokenRepository.remove(storedToken);
            throw new AuthError(AuthErrorCodes.TOKEN_EXPIRED, 'Refresh token expirado', 401);
        }

        const user = storedToken.user;

        // Verificar que el usuario esté activo
        if (!user.isActive) {
            throw new AuthError(AuthErrorCodes.ACCOUNT_INACTIVE, 'Cuenta inactiva', 401);
        }

        // Verificar token version
        if (payload.tokenVersion !== user.tokenVersion) {
            await this.refreshTokenRepository.remove(storedToken);
            throw new AuthError(AuthErrorCodes.TOKEN_REVOKED, 'Token revocado', 401);
        }

        // Determinar roles del usuario
        const roles = await this.getUserRoles(user.id);

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
        await this.refreshTokenRepository.save(storedToken);

        return {
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            expiresIn: newTokens.expiresIn,
            refreshExpiresIn: newTokens.refreshExpiresIn,
            tokenType: 'Bearer'
        };
    }

    /**
     * Cierra sesión del usuario
     */
    async logout(refreshTokenDto: RefreshTokenDto): Promise<void> {
        const { refreshToken } = refreshTokenDto;
        
        const tokenHash = this.tokenService.generateTokenHash(refreshToken);
        const storedToken = await this.refreshTokenRepository.findOne({
            where: { tokenHash }
        });

        if (storedToken) {
            await this.refreshTokenRepository.remove(storedToken);
        }
    }

    /**
     * Revoca todos los tokens de un usuario
     */
    async revokeAllTokens(userId: number): Promise<void> {
        // Incrementar token version
        await this.userRepository.update(userId, {
            tokenVersion: () => 'token_version + 1'
        });

        // Eliminar todos los refresh tokens
        await this.refreshTokenRepository.delete({ userId });
        
        // Desactivar todas las sesiones
        await this.sessionRepository.update(
            { userId },
            { isActive: false }
        );
    }

    /**
     * Cambia la contraseña del usuario
     */
    async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { currentPassword, newPassword } = changePasswordDto;

        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'password', 'tokenVersion']
        });

        if (!user) {
            throw new AuthError(AuthErrorCodes.USER_NOT_FOUND, 'Usuario no encontrado', 404);
        }

        // Verificar contraseña actual
        const isCurrentPasswordValid = await CryptoService.verifyPassword(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new AuthError(AuthErrorCodes.INVALID_PASSWORD, 'Contraseña actual incorrecta', 400);
        }

        // Verificar que la nueva contraseña sea segura
        const passwordCheck = CryptoService.isPasswordSecure(newPassword);
        if (!passwordCheck.isSecure) {
            throw new AuthError(AuthErrorCodes.INVALID_PASSWORD, 'La nueva contraseña no cumple con los requisitos de seguridad', 400);
        }

        // Hashear nueva contraseña
        const hashedPassword = await CryptoService.hashPassword(newPassword);

        // Actualizar contraseña y token version
        await this.userRepository.update(userId, {
            password: hashedPassword,
            tokenVersion: user.tokenVersion + 1
        });

        // Revocar todos los tokens existentes
        await this.refreshTokenRepository.delete({ userId });
    }

    /**
     * Registra un nuevo usuario
     */
    async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const { email, username, password, name, img, role } = createUserDto;

        // Verificar que el email no exista
        const existingUserByEmail = await this.userRepository.findOne({
            where: { email: email.toLowerCase() }
        });

        if (existingUserByEmail) {
            throw new AuthError(AuthErrorCodes.EMAIL_ALREADY_EXISTS, 'El email ya está registrado', 409);
        }

        // Verificar que el username no exista
        const existingUserByUsername = await this.userRepository.findOne({
            where: { username: username.toLowerCase() }
        });

        if (existingUserByUsername) {
            throw new AuthError(AuthErrorCodes.USERNAME_ALREADY_EXISTS, 'El nombre de usuario ya está en uso', 409);
        }

        // Verificar seguridad de la contraseña
        const passwordCheck = CryptoService.isPasswordSecure(password);
        if (!passwordCheck.isSecure) {
            throw new AuthError(AuthErrorCodes.INVALID_PASSWORD, 'La contraseña no cumple con los requisitos de seguridad', 400);
        }

        // Hashear contraseña
        const hashedPassword = await CryptoService.hashPassword(password);

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

        const savedUser = await this.userRepository.save(user);

        // Crear registro de role si se especifica
        if (role && role !== 'buyer') {
            await this.assignUserRole(savedUser.id, role);
        }

        const roles = await this.getUserRoles(savedUser.id);
        return this.mapToUserResponse(savedUser, roles);    }

    // Métodos privados auxiliares
    private async checkLoginAttempts(email: string, ipAddress: string): Promise<void> {
        const since = new Date(Date.now() - (this.LOCKOUT_DURATION_MINUTES * 60 * 1000));
        
        const attemptCount = await this.loginAttemptRepository.count({
            where: {
                email: email.toLowerCase(),
                ipAddress,
                isSuccessful: false,
                createdAt: MoreThanOrEqual(since)
            }
        });

        if (attemptCount >= this.MAX_LOGIN_ATTEMPTS) {
            throw new AuthError(AuthErrorCodes.ACCOUNT_LOCKED, 'Cuenta temporalmente bloqueada por múltiples intentos fallidos', 429);
        }
    }

    private async recordLoginAttempt(
        email: string, 
        ipAddress: string, 
        userAgent?: string, 
        isSuccessful: boolean = false,
        failureReason?: string
    ): Promise<void> {
        const attempt = this.loginAttemptRepository.create({
            email: email.toLowerCase(),
            ipAddress,
            userAgent,
            isSuccessful,
            failureReason
        });

        await this.loginAttemptRepository.save(attempt);
    }

    private async saveRefreshToken(
        userId: number, 
        refreshToken: string, 
        duration: string,
        ipAddress: string,
        userAgent?: string
    ): Promise<void> {
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

        await this.refreshTokenRepository.save(tokenEntity);
    }

    private async cleanupOldRefreshTokens(userId: number): Promise<void> {
        const tokenCount = await this.refreshTokenRepository.count({
            where: { userId, isActive: true }
        });

        if (tokenCount > this.MAX_REFRESH_TOKENS_PER_USER) {
            const oldTokens = await this.refreshTokenRepository.find({
                where: { userId, isActive: true },
                order: { createdAt: 'ASC' },
                take: tokenCount - this.MAX_REFRESH_TOKENS_PER_USER
            });

            await this.refreshTokenRepository.remove(oldTokens);
        }        // Limpiar tokens expirados
        await this.refreshTokenRepository.delete({
            userId,
            expiresAt: LessThan(new Date())
        });
    }

    private async getUserRoles(userId: number): Promise<string[]> {
        // Por ahora, implementación básica basada en las relaciones existentes
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['sellers', 'buyers']
        });

        if (!user) return ['buyer'];

        const roles: string[] = ['buyer']; // Rol base

        if (user.sellers && user.sellers.length > 0) {
            roles.push('seller');
        }

        // Aquí podrías agregar lógica para admin basado en algún campo
        
        return roles;
    }

    private async assignUserRole(userId: number, role: string): Promise<void> {
        // Implementar lógica para asignar roles específicos
        // Por ejemplo, crear registro en tabla de sellers si el role es 'seller'
        
        if (role === 'seller') {
            // Esto requeriría crear el registro en la tabla sellers
            // Se puede implementar cuando se integre con el módulo de sellers
        }
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
