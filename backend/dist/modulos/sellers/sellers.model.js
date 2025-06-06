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
exports.UpdateSellerDto = exports.CreateSellerDto = exports.Sellers = void 0;
var Sellers_1 = require("../../core/entity/Sellers");
Object.defineProperty(exports, "Sellers", { enumerable: true, get: function () { return Sellers_1.Sellers; } });
const class_validator_1 = require("class-validator");
class CreateSellerDto {
}
exports.CreateSellerDto = CreateSellerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del vendedor es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del vendedor debe ser un número' }),
    __metadata("design:type", Number)
], CreateSellerDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La dirección del vendedor no puede estar vacío' }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "direction", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del municipio es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del municipio debe ser un número' }),
    __metadata("design:type", Number)
], CreateSellerDto.prototype, "municipalityId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El número de telefono del vendedor es obligatorio" }),
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del municipio debe ser un número' }),
    __metadata("design:type", Number)
], CreateSellerDto.prototype, "score", void 0);
class UpdateSellerDto {
}
exports.UpdateSellerDto = UpdateSellerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del municipio debe ser un número' }),
    __metadata("design:type", Number)
], UpdateSellerDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "direction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del municipio debe ser un número' }),
    __metadata("design:type", Number)
], UpdateSellerDto.prototype, "municipalityId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(8, 10, { message: 'El teléfono debe tener entre 8 y 10 dígitos' }),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del municipio debe ser un número' }),
    __metadata("design:type", Number)
], UpdateSellerDto.prototype, "score", void 0);
