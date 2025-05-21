// filepath: c:\Users\rosma\OneDrive\Escritorio\conexion\Vea3.0\backend\src\modulos\usuarios\usuarios.model.ts
import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    username!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsOptional()
    img?: string;

    @IsEmail()
    @MaxLength(100)
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password!: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdateUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @IsOptional()
    username?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsOptional()
    img?: string;

    @IsEmail()
    @MaxLength(100)
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    @IsOptional()
    password?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsNumber()
    @IsOptional()
    token_version?: number;
}