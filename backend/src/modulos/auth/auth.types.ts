// Tipos y interfaces para el módulo de autenticación
export interface JwtPayload {
    sub: number;
    email: string;
    username: string;
    roles: string[];
    tokenVersion: number;
    type: 'access' | 'refresh';
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
}

export interface AuthenticatedUser {
    id: number;
    email: string;
    username: string;
    name: string;
    roles: string[];
    isActive: boolean;
    lastLoginAt?: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RefreshTokenData {
    refreshToken: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
}

export interface TokenValidationResult {
    valid: boolean;
    payload?: JwtPayload;
    error?: string;
}

export enum AuthErrorCodes {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    TOKEN_INVALID = 'TOKEN_INVALID',
    TOKEN_REVOKED = 'TOKEN_REVOKED',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
    USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN'
}

export class AuthError extends Error {
    constructor(
        public code: AuthErrorCodes,
        message: string,
        public statusCode: number = 401
    ) {
        super(message);
        this.name = 'AuthError';
    }
}
