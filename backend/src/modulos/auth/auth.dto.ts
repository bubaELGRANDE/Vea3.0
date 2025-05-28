import { 
    IsEmail, 
    IsString, 
    MinLength, 
    MaxLength, 
    IsNotEmpty, 
    IsOptional, 
    IsBoolean,
    Matches,
    IsEnum
} from 'class-validator';
import { Transform } from 'class-transformer';

// DTOs para autenticación
export class LoginDto {
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es obligatorio' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email!: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password!: string;

    @IsBoolean()
    @IsOptional()
    rememberMe?: boolean = false;
}

export class RefreshTokenDto {
    @IsString({ message: 'El refresh token debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El refresh token es obligatorio' })
    refreshToken!: string;
}

export class ChangePasswordDto {
    @IsString({ message: 'La contraseña actual debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña actual es obligatoria' })
    currentPassword!: string;

    @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
    @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial' }
    )
    newPassword!: string;
}

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es obligatorio' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email!: string;
}

export class ResetPasswordDto {
    @IsString({ message: 'El token debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El token es obligatorio' })
    token!: string;

    @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
    @MinLength(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial' }
    )
    newPassword!: string;
}

// DTOs para usuario
export class CreateUserDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
    @Transform(({ value }) => value?.trim())
    name!: string;

    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    username!: string;

    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es obligatorio' })
    @MaxLength(100, { message: 'El email no puede superar los 100 caracteres' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email!: string;

    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(100, { message: 'La contraseña no puede superar los 100 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial' }
    )
    password!: string;

    @IsString()
    @IsOptional()
    @MaxLength(255, { message: 'La URL de la imagen no puede superar los 255 caracteres' })
    img?: string;

    @IsEnum(['buyer', 'seller', 'admin'], { message: 'El rol debe ser buyer, seller o admin' })
    @IsOptional()
    role?: string = 'buyer';
}

export class UpdateUserDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsOptional()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
    @Transform(({ value }) => value?.trim())
    name?: string;

    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @IsOptional()
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    username?: string;

    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsOptional()
    @MaxLength(100, { message: 'El email no puede superar los 100 caracteres' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255, { message: 'La URL de la imagen no puede superar los 255 caracteres' })
    img?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

// DTOs de respuesta
export class TokenResponseDto {
    accessToken!: string;
    refreshToken!: string;
    expiresIn!: number;
    refreshExpiresIn!: number;
    tokenType: string = 'Bearer';
}

export class UserResponseDto {
    id!: number;
    name!: string;
    username!: string;
    email!: string;
    img!: string;
    roles!: string[];
    isActive!: boolean;
    lastLoginAt?: Date;
    createdAt!: Date;
}

export class AuthResponseDto {
    user!: UserResponseDto;
    tokens!: TokenResponseDto;
    message?: string;
}
