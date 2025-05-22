import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email!: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password!: string;
}

export class TokenResponseDto {
    accessToken!: string;
    refreshToken!: string;
    expiresIn!: number; // Podría ser la expiración del accessToken en segundos
}

export class RefreshTokenRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'El token de refresco es obligatorio' })
    refreshToken!: string;
}
