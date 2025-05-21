import { Repository } from 'typeorm';
import { Users } from '../../core/entity/Users';
import { RefreshToken } from '../../core/entity/RefreshToken';
import { LoginDto, TokenResponseDto, RefreshTokenRequestDto } from './auth.model';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AppDataSource } from '../../core/confi/data-source';

export class AuthService {
    private userRepository: Repository<Users>;
    private refreshTokenRepository: Repository<RefreshToken>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
        this.refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
    }

    async login(loginDto: LoginDto): Promise<TokenResponseDto | null> {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null; // Credenciales inválidas
        }

        if (!user.isActive) {
            throw new Error('User account is inactive');
        }

        // Generar tokens
        const accessToken = this.generateAccessToken(user);
        const refreshTokenValue = this.generateRefreshTokenValue(); // Podría ser un UUID o similar

        // Guardar el refresh token en la BD
        const newRefreshToken = this.refreshTokenRepository.create({
            user_id: user,
            refresh_token: refreshTokenValue,
            // Establecer issued_time y expired_time según la lógica de negocio
            // Por ejemplo, expired_time podría ser 7 días desde ahora
            issued_time: new Date(),
            expired_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
        });
        await this.refreshTokenRepository.save(newRefreshToken);

        return {
            accessToken,
            refreshToken: refreshTokenValue,
            expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME || '3600', 10) // ej. 1 hora
        };
    }

    async refreshToken(refreshTokenRequestDto: RefreshTokenRequestDto): Promise<TokenResponseDto | null> {
        const { refreshToken } = refreshTokenRequestDto;
        const storedToken = await this.refreshTokenRepository.findOne({ 
            where: { refresh_token: refreshToken },
            relations: ['user_id'] 
        });

        if (!storedToken) {
            return null; // Token no encontrado
        }

        if (storedToken.expired_time < new Date()) {
            await this.refreshTokenRepository.remove(storedToken); // Token expirado, eliminarlo
            return null;
        }

        const user = storedToken.user_id;
        if (!user.isActive) {
            throw new Error('User account is inactive');
        }

        // Verificar si el token_version del usuario ha cambiado (revocación de todos los tokens)
        // Esta lógica asume que tienes un campo `token_version` en tu entidad Users
        // y que lo incrementas cuando quieres invalidar todos los tokens de un usuario.
        // const payload = jwt.decode(this.generateAccessToken(user)) as any;
        // if (payload.tokenVersion !== user.token_version) {
        //     await this.refreshTokenRepository.remove(storedToken);
        //     return null; // Token revocado
        // }

        const newAccessToken = this.generateAccessToken(user);
        // Opcionalmente, se podría generar un nuevo refresh token y actualizar el existente

        return {
            accessToken: newAccessToken,
            refreshToken: storedToken.refresh_token,
            expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME || '3600', 10)
        };
    }

    async logout(refreshTokenRequestDto: RefreshTokenRequestDto): Promise<void> {
        const { refreshToken } = refreshTokenRequestDto;
        const storedToken = await this.refreshTokenRepository.findOne({ where: { refresh_token: refreshToken } });
        if (storedToken) {
            await this.refreshTokenRepository.remove(storedToken);
        }
        // Opcionalmente, si se quiere invalidar todos los tokens de un usuario al hacer logout:
        // if (storedToken && storedToken.user_id) {
        //     const user = await this.userRepository.findOneBy({ id: storedToken.user_id.id });
        //     if (user) {
        //         user.token_version += 1;
        //         await this.userRepository.save(user);
        //     }
        // }
    }

    private generateAccessToken(user: Users): string {
        const payload = {
            sub: user.id,
            email: user.email,
            // username: user.username, // Puedes añadir más datos si lo necesitas
            tokenVersion: user.token_version // Para la revocación de tokens
        };
        const options: SignOptions = {
            expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME || '3600') // 1 hour in seconds
        };
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || 'yourSecretKey', options);
    }

    private generateRefreshTokenValue(): string {
        // Genera un string aleatorio seguro. crypto es un módulo built-in de Node.js
        return require('crypto').randomBytes(64).toString('hex');
    }
}
