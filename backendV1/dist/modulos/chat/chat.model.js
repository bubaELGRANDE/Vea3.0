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
exports.UpdateChatDto = exports.CreateChatDto = void 0;
const class_validator_1 = require("class-validator");
class CreateChatDto {
}
exports.CreateChatDto = CreateChatDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID de la publicación es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de la publicación debe ser un número' }),
    __metadata("design:type", Number)
], CreateChatDto.prototype, "publishingId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del comprador es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del comprador debe ser un número' }),
    __metadata("design:type", Number)
], CreateChatDto.prototype, "buyerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del vendedor es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del vendedor debe ser un número' }),
    __metadata("design:type", Number)
], CreateChatDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El estado del chat es obligatorio' }),
    (0, class_validator_1.IsBoolean)({ message: 'El estado del chat debe ser un booleano' }),
    __metadata("design:type", Boolean)
], CreateChatDto.prototype, "isEnable", void 0);
class UpdateChatDto {
}
exports.UpdateChatDto = UpdateChatDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID de la publicación debe ser un número' }),
    __metadata("design:type", Number)
], UpdateChatDto.prototype, "publishingId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del comprador debe ser un número' }),
    __metadata("design:type", Number)
], UpdateChatDto.prototype, "buyerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del vendedor debe ser un número' }),
    __metadata("design:type", Number)
], UpdateChatDto.prototype, "sellerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'El estado del chat debe ser un booleano' }),
    __metadata("design:type", Boolean)
], UpdateChatDto.prototype, "isEnable", void 0);
