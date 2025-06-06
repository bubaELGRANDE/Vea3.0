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
exports.UpdateBuyerDto = exports.CreateBuyerDto = void 0;
const class_validator_1 = require("class-validator");
class CreateBuyerDto {
}
exports.CreateBuyerDto = CreateBuyerDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID de usuario no puede estar vacío' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de usuario debe ser un número' }),
    __metadata("design:type", Number)
], CreateBuyerDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(7, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' }),
    __metadata("design:type", String)
], CreateBuyerDto.prototype, "phone", void 0);
class UpdateBuyerDto {
}
exports.UpdateBuyerDto = UpdateBuyerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de usuario debe ser un número' }),
    __metadata("design:type", Number)
], UpdateBuyerDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(7, 10, { message: 'El teléfono debe tener entre 7 y 10 dígitos' }),
    __metadata("design:type", String)
], UpdateBuyerDto.prototype, "phone", void 0);
