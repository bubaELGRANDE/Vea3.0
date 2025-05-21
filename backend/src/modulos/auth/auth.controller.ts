import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenRequestDto } from './auth.model';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response): Promise<void> {
        const loginDto = plainToClass(LoginDto, req.body);
        const errors = await validate(loginDto);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        try {
            const tokens = await this.authService.login(loginDto);
            if (tokens) {
                res.status(200).json(tokens);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        const refreshTokenDto = plainToClass(RefreshTokenRequestDto, req.body);
        const errors = await validate(refreshTokenDto);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        try {
            const tokens = await this.authService.refreshToken(refreshTokenDto);
            if (tokens) {
                res.status(200).json(tokens);
            } else {
                res.status(401).json({ message: 'Invalid or expired refresh token' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        const refreshTokenDto = plainToClass(RefreshTokenRequestDto, req.body);
        // No es estrictamente necesario validar el DTO para logout si solo se espera el token
        // pero es buena práctica mantener la consistencia.
        const errors = await validate(refreshTokenDto);

        if (errors.length > 0) {
            res.status(400).json({ message: 'Validation failed', errors });
            return;
        }

        try {
            await this.authService.logout(refreshTokenDto);
            res.status(200).json({ message: 'Logout successful' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
