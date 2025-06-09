"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.UserResponseDto = exports.TokenResponseDto = exports.UpdateUserDto = exports.CreateUserDto = exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.ChangePasswordDto = exports.RefreshTokenDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
// DTOs para autenticación
class LoginDto {
    constructor() {
        this.rememberMe = false;
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es obligatoria' }),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El refresh token debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El refresh token es obligatorio' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña actual debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña actual es obligatoria' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La nueva contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La nueva contraseña es obligatoria' }),
    (0, class_validator_1.MinLength)(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial' }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
class ForgotPasswordDto {
}
exports.ForgotPasswordDto = ForgotPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El token debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El token es obligatorio' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La nueva contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La nueva contraseña es obligatoria' }),
    (0, class_validator_1.MinLength)(8, { message: 'La nueva contraseña debe tener al menos 8 caracteres' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
// DTOs para usuario
class CreateUserDto {
    constructor() {
        this.role = 'buyer';
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El nombre no puede superar los 50 caracteres' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de usuario es obligatorio' }),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El email no puede superar los 100 caracteres' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es obligatoria' }),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'La contraseña no puede superar los 100 caracteres' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&_,;\-])/, { message: 'La contraseña debe contener al menos: una mayúscula, una minúscula, un número y un carácter especial (@ $ ! % * ? & _ , ; . -)' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, { message: 'La URL de la imagen no puede superar los 255 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['buyer', 'seller', 'admin'], { message: 'El rol debe ser buyer, seller o admin' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El nombre no puede superar los 50 caracteres' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(30, { message: 'El nombre de usuario no puede superar los 30 caracteres' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100, { message: 'El email no puede superar los 100 caracteres' }),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.toLowerCase().trim()),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, { message: 'La URL de la imagen no puede superar los 255 caracteres' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isActive", void 0);
// DTOs de respuesta
class TokenResponseDto {
    constructor() {
        this.tokenType = 'Bearer';
    }
}
exports.TokenResponseDto = TokenResponseDto;
class UserResponseDto {
}
exports.UserResponseDto = UserResponseDto;
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
