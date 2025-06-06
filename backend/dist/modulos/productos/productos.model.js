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
exports.UpdateProductDto = exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del estado es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del estado debe ser un número' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del vendedor es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del vendedor debe ser un número' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El título debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'El título debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(25, { message: 'El título no puede tener más de 25 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El tipo debe ser un número' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "type", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del estado debe ser un número' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "statusId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del vendedor debe ser un número' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El título debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'El título debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(25, { message: 'El título no puede tener más de 25 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El artículo debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(3, { message: 'El artículo debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(25, { message: 'El artículo no puede tener más de 25 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "article", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser una cadena de texto' }),
    (0, class_validator_1.MinLength)(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El tipo debe ser un número' }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "type", void 0);
